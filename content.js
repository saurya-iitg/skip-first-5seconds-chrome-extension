// Function to skip the first 5 seconds of the video
const skipInitialSeconds = () => {
    const video = document.querySelector("video");
  
    if (video) {
      // Wait for the video metadata to load
      video.addEventListener("loadedmetadata", () => {
        if (video.currentTime < 5) {
          video.currentTime = 5; // Skip the first 5 seconds
        }
      });
    }
};
  
// Run the function when the script is loaded
skipInitialSeconds();


// Code below is not working properly

// Function to skip the last 5 seconds of the video
// const skipLastSeconds = () => {
//     const video = document.querySelector("video");
  
//     if (video) {
//       video.addEventListener("timeupdate", () => {
//         if (video.duration - video.currentTime <= 5 && !video.ended) {
//           video.currentTime = video.duration; // Skip to the end
//         }
//       });
//     }
//   };
  
//   // Run the function when the script is loaded
//   skipLastSeconds();
