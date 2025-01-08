document.getElementById('save').addEventListener('click', function() {
    const skipStart = document.getElementById('skipStart').value;
    const skipEnd = document.getElementById('skipEnd').value;
  
    chrome.storage.sync.set({ skipStart: parseInt(skipStart), skipEnd: parseInt(skipEnd) }, function() {
      console.log('Settings saved');
    });
  });
  