// Hamburgemenyn

const hamburgerMenu = document.querySelector(".nav-hamburger-menu");
const navContainer = document.querySelector(".nav-container");

const menuIcon = document.querySelector(".nav-hamburger-menu img");

function toggleMenu() {
  navContainer.classList.toggle("active");

  const isOpen = navContainer.classList.contains("active");

  hamburgerMenu.setAttribute("aria-expanded", isOpen);

  if (isOpen) {
    hamburgerMenu.setAttribute("aria-label", "Close menu");

  } else {
    hamburgerMenu.setAttribute("aria-label", "Open menu");

  }
}

hamburgerMenu.addEventListener("click", toggleMenu);

// Mörkt & ljust läge
// Hämtar in DOM:en

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function updateThemeButton() {
  const isDarkMode = root.classList.contains("dark-mode");

  if (isDarkMode) {
    themeToggle.setAttribute("aria-label", "Activate light mode");
  } else {
    themeToggle.setAttribute("aria-label", "Activate dark mode");
  }
}

function toggleTheme() {
  root.classList.toggle("dark-mode");

  const isDarkMode = root.classList.contains("dark-mode");

  if (isDarkMode) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateThemeButton();
}

if (themeToggle) {
  if (localStorage.getItem("theme") === "dark") {
    root.classList.add("dark-mode");
  }

  updateThemeButton();
  themeToggle.addEventListener("click", toggleTheme);
}

