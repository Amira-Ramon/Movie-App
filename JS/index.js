
import { validate, validtereEnterPssword, toggleButtonPosition, submitButton } from "./validate.js";
import { setupNavbar, setupBackToTop } from "./navbar.js";
import { getData, getTrending, searchMovie } from "./movies.js";

//& Inputs & Regex
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const reenterPasswordInput = document.getElementById("reenter-password");
const passwordIcon = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const nameRegex = /^[a-zA-Z ]{1,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ageRegex = /^([1-9][6-9]|100)$/;
const phoneRegex = /^(010|011|012|015)\d{8}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//& Setup form events
submitButton.addEventListener('mouseover', toggleButtonPosition);

nameInput.addEventListener('input', () => validate(nameRegex, nameInput));
emailInput.addEventListener('input', () => validate(emailRegex, emailInput));
phoneInput.addEventListener('input', () => validate(phoneRegex, phoneInput));
ageInput.addEventListener('input', () => validate(ageRegex, ageInput));
passwordInput.addEventListener('input', () => validate(passwordRegex, passwordInput));
reenterPasswordInput.addEventListener('input', () => validtereEnterPssword(passwordInput, reenterPasswordInput));

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    const formIsValid =
        validate(nameRegex, nameInput) &&
        validate(emailRegex, emailInput) &&
        validate(phoneRegex, phoneInput) &&
        validate(ageRegex, ageInput) &&
        validate(passwordRegex, passwordInput) &&
        validtereEnterPssword(passwordInput, reenterPasswordInput);

    if (formIsValid) location.reload();
});

// & Setup Navbar & Back-to-Top
setupNavbar();
setupBackToTop();

// & Movies navigation
const popularMovies = document.querySelector(".Popular");
const TopRatedMovies = document.querySelector(".TopRated");
const trendingMovies = document.querySelector(".Trending");
const upcomingMovies = document.querySelector(".Upcoming");
const contactUs = document.querySelector(".ContactUs");
const searchContainer = document.querySelector(".search-container");

const searchInput = document.querySelector(".search-input");
const clearSearch = document.getElementById("clearSearch");

searchInput.addEventListener("input", (e) => {
    const query = searchInput.value.trim();

    if (query !== "") {
        clearSearch.style.display = "block";
        searchMovie(query);
    } else {
        clearSearch.style.display = "none";
        getData("now_playing");
    }
});

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.style.display = "none";
    getData("now_playing");
});


window.addEventListener('load', () => getData("now_playing"));

popularMovies.addEventListener('click', () => getData("popular"));
TopRatedMovies.addEventListener('click', () => getData("top_rated"));
trendingMovies.addEventListener('click', getTrending);
upcomingMovies.addEventListener('click', () => getData("upcoming"));
contactUs.addEventListener('click', () => {
    const contactSection = document.querySelector('.contact-us');
    contactSection.scrollIntoView({ behavior: "smooth" });
});

searchContainer.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (!query) getData("now_playing");
    else searchMovie(query);
});


passwordIcon.addEventListener("input", () => {
    if (passwordIcon.value.trim() !== "") {
        togglePassword.style.display = "block";
    } else {
        togglePassword.style.display = "none";
    }
});
passwordIcon.addEventListener("blur", () => {
    togglePassword.style.display = "none";
});

togglePassword.addEventListener("click", () => {
    const type = passwordIcon.type === "password" ? "text" : "password";
    passwordIcon.type = type;

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

