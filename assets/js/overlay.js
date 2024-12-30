document.addEventListener("DOMContentLoaded", () => {
  const mainSearchBar = document.getElementById("search-bar");
  const overlay = document.getElementById("overlay");
  const overlaySearchBar = document.getElementById("overlay-search-bar");

  mainSearchBar.addEventListener("click", (event) => {
    overlay.style.display = "flex";
    overlay.style.animation = "fadeIn 0.2s forwards";
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (overlay.style.display === "flex") {
      overlay.style.animation = "fadeOut 0.3s forwards";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 400);
    }
  });

  overlaySearchBar.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});