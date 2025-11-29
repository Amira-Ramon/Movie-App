
const navbar = document.querySelector("nav");
const openCloseIcon = document.querySelector(".nav-menu i");
const backToTopButton = document.getElementById("back-to-top");

function setupNavbar() {
    openCloseIcon.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
        if (navbar.classList.contains('nav-open')) {
            openCloseIcon.classList.replace('fa-align-justify', 'fa-xmark');
        } else {
            openCloseIcon.classList.replace('fa-xmark', 'fa-align-justify');
        }
    });
}

function toggleBackToTopButton() {
    if (window.scrollY > 200) backToTopButton.classList.add("show");
    else backToTopButton.classList.remove("show");
}

function setupBackToTop() {
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleBackToTopButton();
}

export { setupNavbar, setupBackToTop };
