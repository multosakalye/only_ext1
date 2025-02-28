/* New version of content.js to center the video and ensure proper playback */
(function() {
  // Inject CSS rules to hide distractions and center the video
  const style = document.createElement('style');
  style.textContent = `
    /* Hide distracting elements */
    ytd-masthead,
    #masthead-container,
    ytd-mini-guide,
    #secondary,
    #comments,
    #related,
    #below,
    ytd-watch-metadata,
    .ytp-chrome-top {
      display: none !important;
    }

    /* Full-screen background */
    html, body {
      background-color: #000 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      width: 100% !important;
      height: 100% !important;
    }

    /* Force and style theater mode on the main container */
    ytd-watch-flexy[theater] {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background-color: #000 !important;
    }

    /* Make the player fill its container */
    #movie_player {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Ensure video scales properly */
    video {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Fix controls positioning */
    .ytp-chrome-bottom {
      padding: 0 !important;
      left: 0 !important;
      width: 100% !important;
      bottom: 0 !important;
    }
  `;
  document.documentElement.appendChild(style);

  // Function to force YouTube's theater mode and clean up inline styles
  function applyTheaterMode() {
    const watchFlexy = document.querySelector('ytd-watch-flexy');
    if (watchFlexy) {
      // Remove any inline styles that might interfere with our layout
      watchFlexy.removeAttribute('style');
      if (!watchFlexy.hasAttribute('theater')) {
        watchFlexy.setAttribute('theater', '');
      }
    }
  }

  // Initialize the player after a short delay to allow YouTube to initialize it properly
  function initializePlayer() {
    setTimeout(applyTheaterMode, 500);
  }

  initializePlayer();

  // Re-apply theater mode on URL changes for YouTube's SPA behavior
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (url.includes('/watch')) {
        initializePlayer();
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });

  // Re-apply on window resize to maintain centering
  window.addEventListener('resize', applyTheaterMode);
})(); 