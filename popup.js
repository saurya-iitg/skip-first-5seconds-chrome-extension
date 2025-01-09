document.getElementById("skipButton").addEventListener("click", () => {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const video = document.querySelector("video");
          if (video) {
            video.currentTime += 5;
            console.log("Skipped 5 seconds!");
          } else {
            alert("No video player found!");
          }
        },
      });
    });
  });
  