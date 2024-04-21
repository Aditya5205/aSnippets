function doSometing(info) {
  const inputElement = document.activeElement;
  if (inputElement !== null) inputElement.value += info.menuItemId;
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: doSometing,
      args: [info],
    });
  }
});
