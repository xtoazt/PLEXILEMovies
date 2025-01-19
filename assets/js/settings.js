// Overlay code stuff :D
function showOverlay(event, title, description) {
    event.stopPropagation();
    document.getElementById("overlay-title").textContent = title;
    document.getElementById("overlay-description").textContent =
      description;
    document.getElementById("overlay").classList.add("active");
  }

  function hideOverlay(event) {
    if (event.target.id === "overlay") {
      document.getElementById("overlay").classList.remove("active");
    }
  }

// Ads code stuff :D
let areAdsDisabled = JSON.parse(localStorage.getItem('adsDisabled'));

if (areAdsDisabled === null) {
  areAdsDisabled = false;
}

if (!areAdsDisabled) {
  enableAds();
} else {
  updateButtonStyle(); 
}

document.getElementById('ads-button').addEventListener('click', function () {
  areAdsDisabled = !areAdsDisabled; 
  localStorage.setItem('adsDisabled', JSON.stringify(areAdsDisabled));  

  if (areAdsDisabled) {
      disableAds();
      alert('Ads Disabled.. 😔');
  } else {
      enableAds();
      alert('Ads Enabled..');
  }

  updateButtonStyle();  
});

function enableAds() {
  const adScriptElement = document.createElement('script');
  adScriptElement.type = 'text/javascript';
  adScriptElement.src = '//crockerydestructivespoken.com/02/22/9e/02229e37b98d66a6657744bf7b07c279.js';
  adScriptElement.async = true;
  adScriptElement.id = 'adScript';
  document.body.appendChild(adScriptElement);
}

function disableAds() {
  const adScriptElement = document.getElementById('adScript');
  if (adScriptElement) {
      adScriptElement.remove();
  }
}

function updateButtonStyle() {
  const adsButton = document.getElementById('ads-button');
  if (areAdsDisabled) {
      adsButton.style.backgroundColor = '#a83131';  
  } else {
      adsButton.style.backgroundColor = '#C93131';  
  }
}

// Tab Cloak code stuff :D
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

// Panic Key code stuff :D
let defaultPanicKey = "=";
let defaultLink = "https://google.com";
let currentPanicKey = localStorage.getItem('panicKey') || defaultPanicKey;
let currentLink = localStorage.getItem('currentLink') || defaultLink;

document.getElementById('panic-key-box').textContent = currentPanicKey;
document.getElementById('search-bar').value = currentLink;

document.getElementById('panic-key-box').addEventListener('click', () => {
    const panicBox = document.getElementById('panic-key-box');
    const originalKey = currentPanicKey;
    panicBox.textContent = "-";
    const keyListener = (e) => {
        if (e.key.length === 1) {
            currentPanicKey = e.key;
            localStorage.setItem('panicKey', currentPanicKey);
            panicBox.textContent = currentPanicKey;
            document.removeEventListener('keydown', keyListener);
            document.removeEventListener('click', cancelListener);
        }
    };
    const cancelListener = (e) => {
        if (!e.target.closest('#panic-key-box')) {
            panicBox.textContent = originalKey;
            document.removeEventListener('keydown', keyListener);
            document.removeEventListener('click', cancelListener);
        }
    };
    document.addEventListener('keydown', keyListener);
    document.addEventListener('click', cancelListener, { once: true });
});

document.addEventListener('keydown', (e) => {
    if (e.key === currentPanicKey) {
        window.location.href = currentLink;
    }
});

document.getElementById('search-bar').addEventListener('blur', () => {
    const searchBar = document.getElementById('search-bar');
    let input = searchBar.value.trim();

    if (!input) {
        searchBar.value = currentLink;
    } else if (/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/.test(input)) {
        if (!input.match(/^https?:\/\//)) {
            input = "http://" + input;
        }
        currentLink = input;
    } else {
        currentLink = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    }

    localStorage.setItem('currentLink', currentLink);
    searchBar.value = currentLink;
});

document.getElementById('search-bar').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\s+/g, '');
});
