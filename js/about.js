
// Fetch cv.json

async function fetchData(path) {
  try {
    const dataRequest = await fetch(path);
    const data = await dataRequest.json();
    return data;
  } catch (error) {
    throw new Error(`Could not fetch from:`, path);
  }
}

async function loadCV() {
  /*  try {
  const response = await fetch("../data/cv.json");
  const data = await response.json();
  console.log(data);
  } catch(error) {
    console.log("Kunde inte hämta JSON-filen", error);
  }

  const response = await fetch("../data/cv.json");
  if (!response.ok) {
    throw new Error("Kunde inte hämta JSON-filen");
  }
  const data = await response.json(); */

  const cv = await fetchData("../data/cv.json");

  const workContainer = document.getElementById("experience");
  const educationContainer = document.getElementById("education");

  // En forEach loop för arbetslivserfarenhet
  cv.workExperience.forEach((experience) => {
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

  cv.education.forEach((education) => {
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
