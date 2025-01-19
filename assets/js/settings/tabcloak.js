function changeFaviconAndTitle(faviconUrl, titleText) {
    document.title = titleText;
  
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = faviconUrl;
  
    localStorage.setItem('favicon', faviconUrl);
    localStorage.setItem('title', titleText);
  }
  
  function loadFaviconAndTitle() {
    const savedFavicon = localStorage.getItem('favicon');
    const savedTitle = localStorage.getItem('title');
  
    if (savedFavicon && savedTitle) {
      changeFaviconAndTitle(savedFavicon, savedTitle);
    }
  }
  
  window.addEventListener('DOMContentLoaded', function() {
    loadFaviconAndTitle();
  
    document.querySelectorAll('.tab-cloak-box').forEach(function(box) {
      box.addEventListener('click', function() {
        const faviconUrl = box.getAttribute('data-favicon');
        const titleText = box.getAttribute('data-title');
        
        if (titleText === 'Reset') {
          localStorage.removeItem('favicon');
          localStorage.removeItem('title');
          location.reload();
        } else {
          changeFaviconAndTitle(faviconUrl, titleText);
        }
      });
    });
  });