window.onload = function() {
  const hashTitle = decodeURIComponent(window.location.hash.substring(1)).replace(/\+/g, " ");
  let watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
  const movie = watchedMovies.find(m => m.title === hashTitle);

  if (movie) {
    const iframe = document.createElement("iframe");
    iframe.src = movie.videoUrl;
    iframe.width = "1000px";
    iframe.height = "470px";
    iframe.frameborder = "0";
    iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "fullscreen");
    iframe.style.border = "1px solid #332424";
    iframe.style.borderRadius = "12px";
    iframe.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    iframe.style.margin = "20px 0";
    iframe.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  
    document.getElementById("videoContainer").appendChild(iframe);
    document.title = `PLEXILE Movies - ${movie.title}`;
  } else {
    alert("No video selected.");
  }
};
