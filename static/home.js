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

const slider = document.querySelector('.slider');
const images = Array.from(document.querySelectorAll('.slider img'));
let currentIndex = 0;

function slideImages() {
    const imageWidth = images[0].clientWidth;
    currentIndex = (currentIndex + 1) % images.length;
    const offset = -currentIndex * imageWidth;
    slider.style.transition = 'transform 0.8s ease-in-out';
    slider.style.transform = `translateX(${offset}px)`;
}

setInterval(slideImages, 3000);





// Redirect links
const aboutUsLink = document.querySelector(".links a[href='/about']");
const rateLink = document.querySelector(".links a[href='/rate']");
const homeLink = document.querySelector(".links a[href='/home']");
const ratedLink = document.querySelector(".links a[href='/rated']");

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
