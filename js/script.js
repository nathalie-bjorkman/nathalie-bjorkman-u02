
const hamburgerMenu = document.querySelector(".nav-hamburger-menu");
const navContainer = document.querySelector(".nav-container");

const menuIcon = document.querySelector(".nav-hamburger-menu img");

function toggleMenu() {
  navContainer.classList.toggle("active");

  const isOpen = navContainer.classList.contains("active");

  hamburgerMenu.setAttribute("aria-expanded", isOpen);

  if (isOpen) {
    hamburgerMenu.setAttribute("aria-label", "Close menu");

    menuIcon.src = "../assets/assets-home/close-menu.svg";
  } else {
    hamburgerMenu.setAttribute("aria-label", "Open menu");

    menuIcon.src = "../assets/assets-home/hamburger-menu.svg";
  }
}

hamburgerMenu.addEventListener("click", toggleMenu);

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

const workContainers = document.querySelectorAll("#experience .work");

const educationContainers = document.querySelectorAll("#education .work");

fetch("../data/cv.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Kunde inte hämta CV-filen");
    }

    return response.json();
  })

  .then(function (data) {
    console.log(data);
  })

  .catch(function (error) {
    console.log("Något gick fel:", error);
  })

  .then(function (data) {
    //Arbetslivserfarenhet
    data.workExperience.forEach(function (work, index) {
      const container = workContainers[index];

      container.querySelector(".under-title").textContent = work.title;

      container.querySelector(".company").append(work.company);

      container.querySelector(".location").append(work.location);

      container.querySelector(".date").append(work.start + " - " + work.end);
    });
  });
