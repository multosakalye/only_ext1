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
    '#player-ads'
  ];

  // Function to remove unwanted elements
  function removeUnwantedElements() {
    selectorsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  }

  // Remove unwanted elements immediately
  removeUnwantedElements();

  // Create a MutationObserver to remove any future unwanted elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            selectorsToRemove.forEach(selector => {
              if (node.matches(selector)) {
                node.remove();
              } else {
                // Also check child elements
                node.querySelectorAll(selector).forEach(el => el.remove());
              }
            });
          }
        });
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Set background and body styles
  document.documentElement.style.backgroundColor = '#000';
  document.body.style.backgroundColor = '#000';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';

  // Find the movie player element and center it in the viewport
  var moviePlayer = document.getElementById('movie_player');
  if (moviePlayer) {
    moviePlayer.style.position = 'fixed';
    moviePlayer.style.top = '50%';
    moviePlayer.style.left = '50%';
    moviePlayer.style.transform = 'translate(-50%, -50%)';
    moviePlayer.style.zIndex = '9999';
  } else {
    console.warn('Movie player element (#movie_player) not found.');
  }
}); 