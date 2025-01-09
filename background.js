chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "injectVideoSkipper" && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: () => {
        console.log("Injecting video skipper...");

        const enforceCurrentTime = (video, time) => {
          video.currentTime = time;
          console.log(`Setting currentTime to: ${time}`);
          setTimeout(() => {
            if (video.currentTime !== time) {
              console.log(`Retrying currentTime set to: ${time}`);
              video.currentTime = time;
            }
          }, 100);
        };

        const skipInitialSeconds = (video) => {
          video.addEventListener("loadedmetadata", () => {
            if (video.currentTime < 5) {
              console.log("Skipping first 5 seconds...");
              enforceCurrentTime(video, 5);
            }
          });
        };

        const skipLastSeconds = (video) => {
          video.addEventListener("timeupdate", () => {
            if (video.duration - video.currentTime <= 5 && !video.ended) {
              console.log("Skipping last 5 seconds...");
              enforceCurrentTime(video, video.duration);
            }
          });
        };

        const setupVideoSkipper = () => {
          const video = document.querySelector("video");
          if (video) {
            console.log("Setting up skipper for video:", video);
            skipInitialSeconds(video);
            skipLastSeconds(video);
          } else {
            console.log("No video found. Retrying...");
            setTimeout(setupVideoSkipper, 500);
          }
        };

        setupVideoSkipper();
      },
    });
  }
});


// // Percentage approach

// chrome.runtime.onMessage.addListener((message, sender) => {
//   if (message.action === "injectVideoSkipper" && sender.tab) {
//     chrome.scripting.executeScript({
//       target: { tabId: sender.tab.id },
//       func: () => {
//         console.log("Injecting percentage-based video skipper...");

//         const enforceCurrentTime = (video, time) => {
//           video.currentTime = time;
//           console.log(`Setting currentTime to: ${time}`);
//           setTimeout(() => {
//             if (video.currentTime !== time) {
//               console.log(`Retrying currentTime set to: ${time}`);
//               video.currentTime = time;
//             }
//           }, 100);
//         };

//         const skipInitialPercentage = (video) => {
//           video.addEventListener("loadedmetadata", () => {
//             const initialSkip = video.duration * 0.05; // 5% of the video duration
//             if (video.currentTime < initialSkip) {
//               console.log(`Skipping first 5% (${initialSkip.toFixed(2)} seconds)...`);
//               enforceCurrentTime(video, initialSkip);
//             }
//           });
//         };

//         const skipFinalPercentage = (video) => {
//           video.addEventListener("timeupdate", () => {
//             const finalSkip = video.duration * 0.95; // 95% of the video duration
//             if (video.currentTime >= finalSkip && !video.ended) {
//               console.log(`Skipping last 5% (${finalSkip.toFixed(2)} seconds to end)...`);
//               enforceCurrentTime(video, video.duration);
//             }
//           });
//         };

//         const setupVideoSkipper = () => {
//           const video = document.querySelector("video");
//           if (video) {
//             console.log("Setting up percentage-based skipper for video:", video);
//             skipInitialPercentage(video);
//             skipFinalPercentage(video);
//           } else {
//             console.log("No video found. Retrying...");
//             setTimeout(setupVideoSkipper, 500);
//           }
//         };

//         setupVideoSkipper();
//       },
//     });
//   }
// });

// Previous code of the previous code

// chrome.runtime.onMessage.addListener((message, sender) => {
//   if (message.action === "injectVideoSkipper" && sender.tab) {
//     chrome.scripting.executeScript({
//       target: { tabId: sender.tab.id },
//       func: () => {
//         const skipInitialSeconds = (video) => {
//           video.addEventListener("loadedmetadata", () => {
//             if (video.currentTime < 5) {
//               console.log("Skipping first 5 seconds...");
//               video.currentTime = 5; // Skip the first 5 seconds
//             }
//           });
//         };

//         const skipLastSeconds = (video) => {
//           video.addEventListener("timeupdate", () => {
//             if (video.duration - video.currentTime <= 5 && !video.ended) {
//               console.log("Skipping last 5 seconds...");
//               video.currentTime = video.duration; // Skip to the end
//             }
//           });
//         };

//         const setupVideoSkipper = () => {
//           const video = document.querySelector("video");
//           if (video) {
//             console.log("Setting up skipper for video:", video);
//             skipInitialSeconds(video);
//             skipLastSeconds(video);
//           } else {
//             console.log("No video found. Retrying...");
//             setTimeout(setupVideoSkipper, 500); // Retry until video is available
//           }
//         };

//         setupVideoSkipper();
//       },
//     });
//   }
// });
