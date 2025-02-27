// Wait for the page to load
window.addEventListener('load', function() {
  // Array of selectors for elements to be removed
  const selectorsToRemove = [
    'ytd-masthead',
    '#masthead-container',
    'ytd-mini-guide',
    '#secondary',
    '#comments',
    '#related',
    '#player-ads',
    '#below', // Remove the area below the video
    'ytd-watch-metadata' // Remove video metadata
  ];

  // Function to remove unwanted elements
  function removeUnwantedElements() {
    selectorsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  }

  // Function to center and style the video player
  function centerVideoPlayer() {
    const moviePlayer = document.getElementById('movie_player');
    const primaryInner = document.getElementById('primary-inner');
    const player = document.getElementById('player');
    const playerContainer = document.getElementById('player-container');
    
    if (moviePlayer && player) {
      // Style the player container
      if (playerContainer) {
        playerContainer.style.position = 'fixed';
        playerContainer.style.top = '50%';
        playerContainer.style.left = '50%';
        playerContainer.style.transform = 'translate(-50%, -50%)';
        playerContainer.style.margin = '0';
        playerContainer.style.padding = '0';
        playerContainer.style.width = '95vw';
        playerContainer.style.height = '90vh';
        playerContainer.style.maxWidth = '160vh'; // Maintain 16:9 aspect ratio
        playerContainer.style.zIndex = '9999';
      }

      // Style the player element
      player.style.position = 'relative';
      player.style.width = '100%';
      player.style.height = '100%';
      player.style.margin = '0';
      player.style.padding = '0';

      // Style the movie player
      moviePlayer.style.width = '100%';
      moviePlayer.style.height = '100%';

      // Fix video stream container positioning
      const videoStream = moviePlayer.querySelector('.html5-video-container');
      if (videoStream) {
        videoStream.style.width = '100%';
        videoStream.style.height = '100%';
        videoStream.style.padding = '0';
      }

      // Fix video element positioning
      const video = moviePlayer.querySelector('video');
      if (video) {
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.position = 'absolute';
        video.style.left = '0';
        video.style.top = '0';
      }

      // Fix controls positioning
      const controls = moviePlayer.querySelector('.ytp-chrome-bottom');
      if (controls) {
        controls.style.padding = '0';
        controls.style.left = '0';
        controls.style.width = '100%';
        controls.style.bottom = '0';
      }

      // Remove any padding from the video container
      const videoContainer = moviePlayer.querySelector('.html5-main-video');
      if (videoContainer) {
        videoContainer.style.padding = '0';
        videoContainer.style.left = '0';
        videoContainer.style.top = '0';
      }
    }

    // Clean up other elements
    if (primaryInner) {
      primaryInner.style.margin = '0';
      primaryInner.style.padding = '0';
    }
  }

  // Initial cleanup and centering
  removeUnwantedElements();
  centerVideoPlayer();

  // Create a MutationObserver to handle dynamic changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Remove unwanted elements
            selectorsToRemove.forEach(selector => {
              if (node.matches(selector)) {
                node.remove();
              } else {
                node.querySelectorAll(selector).forEach(el => el.remove());
              }
            });
          }
        });
      }
    });
    // Recenter video after mutations
    centerVideoPlayer();
  });

  // Start observing the document
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });

  // Set background styles
  document.documentElement.style.backgroundColor = '#000';
  document.body.style.backgroundColor = '#000';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';

  // Add window resize handler to maintain centering
  window.addEventListener('resize', centerVideoPlayer);
}); 