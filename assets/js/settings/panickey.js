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
