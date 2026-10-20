

const hamburgerMenu = document.querySelector(".nav-hamburger-menu");
const navContainer = document.querySelector(".nav-container");

const menuIcon = document.querySelector("img")

function toggleMenu() {
    navContainer.classList.toggle("active");

    const isOpen = navContainer.classList.contains("active");

    hamburgerMenu.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        hamburgerMenu.setAttribute("aria-label", "Close menu");

        menuIcon.src = "./assets/assets-home/close-menu.svg";
    } else {
        hamburgerMenu.setAttribute("aria-label", "Open menu");

        menuIcon.src = "./assets/assets-home/hamburger-menu.svg";
    }
}

hamburgerMenu.addEventListener("click", toggleMenu)



