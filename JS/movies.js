
const apiKey = "e04adb751070e367bee9ca14d22e2ff8";
const htmlContainer = document.querySelector(".row");

async function getData(endpoint) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    displayData(data.results);
}

async function getTrending() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    displayData(data.results);
}

async function searchMovie(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1`);
    const data = await response.json();
    displayData(data.results);
}

function displayData(data) {
    let cardsHTML = "";
    for (let i = 0; i < data.length; i++) {
        let starsHTML = "";
        const rating = data[i].vote_average / 2;
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;

        for (let j = 1; j <= 5; j++) {
            if (j <= fullStars) starsHTML += `<i class="fa-solid fa-star"></i>`;
            else if (j === fullStars + 1 && halfStar) starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
        }

        let overview = data[i].overview || "";
        if (overview.length > 300) overview = overview.slice(0, 300) + "...";

        cardsHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeIn">
            <div class="card movie-card position-relative overflow-hidden animate__fadeIn">
                <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" class="card-img movie-img" alt="Movie">
                <div class="card-img-overlay movie-content">
                    <h4 class="card-title text-white">${data[i].title}</h4>
                    <p class="card-text text-white">${overview}</p>
                    <p class="release text-white"> Release Date : ${data[i].release_date}</p>
                    <div class="stars text-warning fs-4">${starsHTML}</div>
                    <div class="rating text-white">${Number(data[i].vote_average.toFixed(1))}</div>
                </div>
            </div>
        </div>`;
    }
    htmlContainer.innerHTML = cardsHTML;
}

export { getData, getTrending, searchMovie };
