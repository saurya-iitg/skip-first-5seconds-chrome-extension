document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['skipStart', 'skipEnd'], function(data) {
      const skipStart = data.skipStart || 5;
      const skipEnd = data.skipEnd || 5;
      const video = document.querySelector('video');
  
      if (video) {
        video.currentTime += skipStart;
  
        video.addEventListener('timeupdate', function() {
          if (video.duration - video.currentTime <= skipEnd) {
            video.pause();
          }
        });
      }
    });
  });
  