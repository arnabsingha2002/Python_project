const slider = document.querySelector('.slider');
const images = Array.from(document.querySelectorAll('.slider img'));
let currentIndex = 0;

// Initially set the opacity of the first image to 1 and others to 0
images.forEach((img, index) => {
    if (index === 0) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
    }
});

function slideImages() {
    const imageWidth = 1000; // Set the width of the images

    // Fade out the current image
    images[currentIndex].style.transition = 'opacity 0.8s ease-in-out';
    images[currentIndex].style.opacity = '0';

    // Fade in the next image
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.transition = 'opacity 0.8s ease-in-out';
    images[currentIndex].style.opacity = '1';
}

setInterval(slideImages, 3000);

const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = document.querySelector(".navbar .close-btn");

hamburgerBtn.addEventListener("click", () => {
    const navbarMenu = document.querySelector(".navbar .links");
    navbarMenu.classList.toggle("show-menu");
});

hideMenuBtn.addEventListener("click", () => {
    const navbarMenu = document.querySelector(".navbar .links");
    navbarMenu.classList.remove("show-menu");
});

const aboutUsLink = document.querySelector(".links a[href='/about']");
const rateLink = document.querySelector(".links a[href='/rate']");
const homeLink = document.querySelector(".links a[href='/home']");

aboutUsLink.addEventListener("click", () => {
    window.location.href = "/about-us";
});

rateLink.addEventListener("click", () => {
    window.location.href = "/rate";
});

homeLink.addEventListener("click", () => {
    window.location.href = "/home";
});
