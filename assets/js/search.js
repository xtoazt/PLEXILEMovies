const searchBar = document.getElementById("overlay-search-input");
const searchContainer = document.getElementById("overlay-search-bar");
const boxesContainer = document.getElementById("boxesContainer");

const apiKey = "966c4f4f";

const errorMessage = document.createElement("div");
errorMessage.id = "api-error-message";
errorMessage.style.color = "red";
errorMessage.style.marginTop = "10px";
errorMessage.style.opacity = "0";
errorMessage.style.transition = "opacity 0.5s ease";
errorMessage.style.textAlign = "center";
searchContainer.parentNode.insertBefore(errorMessage, searchContainer.nextSibling);

async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);

    if (!response.ok) {
      throw new Error("Network error.");
    }

    const data = await response.json();

    if (data.Response === "False" && data.Error === "Invalid API key!") {
      throw new Error("Invalid API key.");
    }

    hideError();
    return data.Search || [];
  } catch (error) {
    showError("Error: API Key not Functioning. Please change your API in Settings!");
    return [];
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.opacity = "1";
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
    img.src = movie.Poster !== "N/A" ? movie.Poster : "/assets/images/imagenotfound.png";
    img.alt = movie.Title;

    const text = document.createElement("div");
    text.classList.add("text");
    text.innerText = movie.Title;

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
