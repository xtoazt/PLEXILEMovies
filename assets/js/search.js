const searchBar = document.getElementById("overlay-search-input");
const searchContainer = document.getElementById("overlay-search-bar");
const boxesContainer = document.getElementById("boxesContainer");

const apiKey = "966c4f4f"; // e83ad567 (Another API <:)

async function fetchMovies(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
  );
  const data = await response.json();
  return data.Search || [];
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
    img.src =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "/assets/images/imagenotfound.png";
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
    } else {
      boxesContainer.innerHTML = "";
      searchContainer.style.top = "50%";
    }
  } else {
    searchContainer.style.top = "50%";
    boxesContainer.style.opacity = "0";
    boxesContainer.innerHTML = "";
  }
});
