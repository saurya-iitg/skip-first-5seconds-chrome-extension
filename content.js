// Function to skip the first 5 seconds of the video
const skipInitialSeconds = (video) => {
  video.addEventListener("loadedmetadata", () => {
    if (video.currentTime <= 5) {
      video.currentTime = 5; // Skip the first 5 seconds
      console.log("Skipped the first 5 seconds");
    }
  });
};

// Function to skip the last 5 seconds of the video
const skipLastSeconds = (video) => {
  video.addEventListener("timeupdate", () => {
    if (video.duration - video.currentTime <= 5 && !video.ended) {
      video.currentTime = video.duration; // Skip to the end
      console.log("Skipped the last 5 seconds");
    }
  });
};

// Main function to apply both behaviors
const setupVideoSkipper = () => {
  console.log("Setting up video skipper");
  const video = document.querySelector("video");
  if (video) {
    console.log("Video found, setting up skipper");
    skipInitialSeconds(video);
    skipLastSeconds(video);
  }
};

// Observe for video elements in case they are added dynamically
const observer = new MutationObserver(() => {
  if (document.querySelector("video")) {
    console.log("Video found");
    setupVideoSkipper();
    observer.disconnect(); // Stop observing once the video is found
  }
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });
