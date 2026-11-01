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

    menuIcon.src = "../assets/assets-home/close-menu.svg";
  } else {
    hamburgerMenu.setAttribute("aria-label", "Open menu");

    menuIcon.src = "../assets/assets-home/hamburger-menu.svg";
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

// Fetch cv.json
async function loadCV() {
  try {
  const response = await fetch("../data/cv.json");
  const data = await response.json();
  console.log(data);
  } catch(error) {
    console.log("Kunde inte hämta JSON-filen", error);
  }

  const response = await fetch("../data/cv.json");
  if (!response.ok) {
    throw new Error("Kunde inte JSON-filen");
  }
  const data = await response.json();
  
  const workContainer = document.getElementById("experience");
  const educationContainer = document.getElementById("education");

  // En forEach loop för arbetslivserfarenhet
    data.workExperience.forEach((experience) => {
    const cardWork = document.createElement("div");
    const headingWork = document.createElement("h3");
    const pCompanyWork = document.createElement("p");
    const pLocationWork = document.createElement("p");
    const pDateWork = document.createElement("p");
    const hrWork = document.createElement("hr");

    headingWork.textContent = experience.title;
    pCompanyWork.textContent = experience.company;
    pLocationWork.textContent = experience.location;
    pDateWork.textContent = experience.date;

    cardWork.appendChild(headingWork);
    cardWork.appendChild(pCompanyWork);
    cardWork.appendChild(pLocationWork);
    cardWork.appendChild(pDateWork);
    cardWork.appendChild(hrWork);

    workContainer.appendChild(cardWork);

    // Få in CSS:en med classList.add

    cardWork.classList.add("work");
    headingWork.classList.add("under-title");
    pDateWork.classList.add("date");
    pCompanyWork.classList.add("company");
    pLocationWork.classList.add("location");
    cardWork.classList.add("description");
  });

  // ForEach loop för utbildning

  data.education.forEach((education) => {
    const cardEducation = document.createElement("div");
    const headingEducation = document.createElement("h3");
    const pCompanyEducation = document.createElement("p");
    const pLocationEducation = document.createElement("p");
    const pDateEducation = document.createElement("p");
    const hrEducation = document.createElement("hr");

    headingEducation.textContent = education.title;
    pCompanyEducation.textContent = education.company;
    pLocationEducation.textContent = education.location;
    pDateEducation.textContent = education.date;

    cardEducation.appendChild(headingEducation);
    cardEducation.appendChild(pCompanyEducation);
    cardEducation.appendChild(pLocationEducation);
    cardEducation.appendChild(pDateEducation);
    cardEducation.appendChild(hrEducation);

    educationContainer.appendChild(cardEducation);

    // Få in CSS:en med classList.add

    cardEducation.classList.add("work");
    headingEducation.classList.add("under-title");
    pDateEducation.classList.add("date");
    pCompanyEducation.classList.add("company");
    pLocationEducation.classList.add("location");
    cardEducation.classList.add("description");
  });
}

loadCV();
