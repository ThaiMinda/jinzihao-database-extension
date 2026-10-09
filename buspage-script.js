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

function injectBusModelDetail() {
    const subscribeLink = document.querySelector('a[href^="/bus?subscribe="]');
    if (!subscribeLink) return;

    if(subscribeLink.previousElementSibling?.classList.contains("bus-model-detail")) return;

    const href = subscribeLink.getAttribute("href");
    const busNumStr = href.match(/subscribe=(\d+)/)?.[1];
    if(!busNumStr) return;
    const busNum = parseInt(busNumStr,10);

    const modelName = getBusModel(busNum);

    const modelDiv = document.createElement("div");
    modelDiv.className = "bus-model-detail";
    modelDiv.style.cssText = "margin:0 0 0 0; color:var(--bs-secondary-color); font-size:1.0rem;";
    modelDiv.textContent = `车型：${modelName}`;

    subscribeLink.before(modelDiv);
}

injectBusModelDetail();

const detailObserver = new MutationObserver(()=>{
    injectBusModelDetail();
});
detailObserver.observe(document.body, {childList:true, subtree:true});