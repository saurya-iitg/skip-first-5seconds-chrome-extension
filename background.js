chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ skipStart: 5, skipEnd: 5 });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });
    }
  });
  