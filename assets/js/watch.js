window.onload = function() {
  const videoUrl = localStorage.getItem("videoUrl");
  const videoTitle = localStorage.getItem("videoTitle");

  if (videoUrl) {
    const iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.width = "900px";
    iframe.height = "500px"; 
    iframe.frameborder = "0";

    iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "fullscreen"); 
  
    iframe.style.border = "1px solid #332424"; 
    iframe.style.borderRadius = "10px";
    iframe.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)"; 
    iframe.style.margin = "20px 0"; 
    iframe.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  
    document.getElementById("videoContainer").appendChild(iframe);
  } else {
    alert("No video selected.");
  }

  document.title = `PLEXILE Movies - ${videoTitle ? videoTitle : "Watch"}`;
};
