/**
 * 根据车号查找车型
 * @param {number} busNo 车号数字
 * @returns {string} 车型名称
 */

function getBusModel(busNo) {
    for (const [model, min, max] of busModelRanges){
        if (busNo >= min && busNo <= max){
            return model;
        }
    }
    return "未知车型";
}

function scanAndInjectModel() {
    const pList = document.querySelectorAll('p.mb-0[style*="display: flex;"]');

    for (const pEl of pList) {
        if (pEl.nextElementSibling?.classList.contains("bus-model-inserted")) continue;

        const link = pEl.querySelector('a[href^="/bus/"]');
        if (!link) continue;

        const rawText = link.textContent.trim();
        const busNumStr = rawText.match(/\d+/)?.[0];
        if (!busNumStr) continue;
        const busNum = parseInt(busNumStr, 10);

        const modelName = getBusModel(busNum);

        const modelDiv = document.createElement("div");
        modelDiv.className = "bus-model-inserted";
        modelDiv.style.cssText = "margin:0 0 2px; color:var(--bs-secondary-color); font-size:0.8rem;";
        modelDiv.textContent = `${modelName}`;

        pEl.after(modelDiv);
    }
}

scanAndInjectModel();

const observer = new MutationObserver(() => {
    scanAndInjectModel();
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});