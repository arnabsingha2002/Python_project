const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

aboutUsLink.addEventListener("click", () => {
    window.location.href = "/about-us";
});

rateLink.addEventListener("click", () => {
    window.location.href = "/rate";
});

homeLink.addEventListener("click", () => {
    window.location.href = "/";
});