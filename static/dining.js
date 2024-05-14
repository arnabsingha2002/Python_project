const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

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
    window.location.href = "/home";
});

ratedLink.addEventListener("click", () => {
    window.location.href = "/rated";
});

aboutUsLink.addEventListener("click", () => {
    window.location.href = "/dining";
});

