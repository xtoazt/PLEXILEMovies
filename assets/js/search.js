const searchBar = document.getElementById("overlay-search-input");
const searchContainer = document.getElementById("overlay-search-bar");
const boxesContainer = document.getElementById("boxesContainer");

const defaultOmdbKey = "966c4f4f"; 
const defaultTmdbKey = "0b1a381779730d5ba21cec8bd86124ea";

let apiKey = localStorage.getItem("currentApiKey") || defaultOmdbKey; 
let currentServer = localStorage.getItem("currentApiServer") || "OMDB"; 

const errorMessage = document.createElement("div");
errorMessage.id = "api-error-message";
errorMessage.style.color = "red";
errorMessage.style.marginTop = "10px";
errorMessage.style.opacity = "0";
errorMessage.style.transition = "opacity 0.5s ease";
errorMessage.style.textAlign = "center";
searchContainer.parentNode.insertBefore(errorMessage, searchContainer.nextSibling);

const errorBox = document.getElementById("error-box");

async function fetchMovies(query) {
  try {
    let url;

    if (currentServer === "OMDB") {
      url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    } else if (currentServer === "TMDB") {
      url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
    } else {
      throw new Error("Unknown server.");
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network error.");
    }

    const data = await response.json();

    console.log(data);

    if (currentServer === "OMDB" && data.Response === "False" && data.Error === "Invalid API key!") {
      throw new Error("Invalid API key.");
    }

    hideError();
    hideErrorBox();  
    return currentServer === "OMDB" ? data.Search || [] : data.results || []; 
  } catch (error) {
    
    showErrorBox();
    return [];
  }
}

function showErrorBox() {
  
  searchContainer.classList.add("hidden");

  errorBox.classList.add("show");
}

function hideErrorBox() {
  
  searchContainer.classList.remove("hidden");

  errorBox.classList.remove("show");
}

function hideError() {
  errorMessage.style.opacity = "0";
}

function displayMovies(movies) {
  boxesContainer.innerHTML = "";

  if (movies.length === 0) {
    return;
  }

  const maxMovies = movies.slice(0, 10);

  maxMovies.forEach((movie, index) => {
    const box = document.createElement("div");
    box.classList.add("box");

    const img = document.createElement("img");
    
    const posterUrl = currentServer === "TMDB" ? 
    `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
     movie.Poster !== "N/A" && movie.Poster ? movie.Poster : "/assets/images/imagenotfound.png";

    img.src = posterUrl;
    img.alt = movie.title || movie.name;  

    const text = document.createElement("div");
    text.classList.add("text");

    text.innerText = currentServer === "TMDB" ? movie.title || movie.name || "API Error 404" : movie.Title || "API Error 404";

    box.appendChild(img);
    box.appendChild(text);
    boxesContainer.appendChild(box);
  });

  setTimeout(() => {
    boxesContainer.style.opacity = "1";
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box, index) => {
      setTimeout(() => {
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
      }, index * 80);
    });
  }, 100);
}

searchBar.addEventListener("input", async () => {
  const query = searchBar.value.trim();
  if (query) {
    const movies = await fetchMovies(query);

    if (movies.length > 0) {
      displayMovies(movies);
      searchContainer.style.top = "10%";
      hideError(); 
    } else {
      boxesContainer.innerHTML = "";
      searchContainer.style.top = "50%";
      hideError(); 
    }
  } else {
    searchContainer.style.top = "50%";
    boxesContainer.style.opacity = "0";
    boxesContainer.innerHTML = "";
    hideError(); 
  }
});
