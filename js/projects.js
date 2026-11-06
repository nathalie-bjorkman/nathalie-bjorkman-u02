/* const githubUrl = "https://api.github.com/users/nathalie-bjorkman/repos";

async function getGithubProjects() {
    try {
        const response = await fetch(githubUrl);
        if (!response.ok) {
            throw new Error("Could not fetch GitHub projects");
        }

        const projects = await response.json();

        console.log(projects);
    } catch (error) {
        console.error("Something went wrong", error);
    }


    projects.forEach(project => {
        console.log(project.name);
        console.log(project.description);
    });
} */
/* console.log("projects.js is running"); */

async function fetchGithub(GithubPath) {
  try {
    const apiRequest = await fetch(GithubPath);

    if (!apiRequest.ok) {
      throw new Error("Could not fetch Github projects");
    }

    const projects = await apiRequest.json();

    return projects;
  } catch (error) {
    console.log("Something went wrong:", error);
    throw error;
  }
}

const githubUrl =
  "https://api.github.com/users/nathalie-bjorkman/repos?per_page=100";

async function loadGithub() {
  const projects = await fetchGithub(githubUrl);

  // Repositories som inte ska visas, 
  // kan lägga till fler direkt här, utan att behöva ändra i myProjects funtionen här nere
  const excludedProjects = ["u03---Projektarbet--quiz-app-grupp-7"];

  // Filtrering av projekt från GitHub
  // Filter går igenom alla repositories
  // !project.fork gör att det inte visas repositories som är forks
  // !project.archived gör att det inte visas arkiverade projekt

  const myProjects = projects.filter((project) => {
    return (
      // !== betyder inte lika med
      !project.fork &&
      !project.archived &&
      !excludedProjects.includes(project.name)
    );
  });

  // Sortering efter när de senast uppdaterades
  // Så att den som uppdaterades senast visas först

  myProjects.sort((a, b) => {
    return new Date(b.pushed_at) - new Date(a.pushed_at);
  });

  const projectContainer = document.querySelector(".projects-container");

  // Skapa projektkorten
  myProjects.forEach((project) => {
    const cardProjects = document.createElement("article");

    const projectContent = document.createElement("div");
    const projectLinks = document.createElement("div");

    const headingProject = document.createElement("h2");
    const descriptionProject = document.createElement("p");
    const linkImg = document.createElement("img");
    const link = document.createElement("a");

    headingProject.textContent = project.name;
    descriptionProject.textContent =
      project.description ?? "No description available.";
    link.href = project.html_url;
    link.textContent = "view Code";

    projectContent.classList.add("project-content");
    projectLinks.classList.add("project-links");
    cardProjects.classList.add("project");
    headingProject.classList.add("project-title-content");
    descriptionProject.classList.add("under-project-title");
    linkImg.classList.add("view-code");
    link.classList.add("view-code-text");

    linkImg.src = "../assets/assets-projects/github.png";
    linkImg.alt = "";

    projectContent.appendChild(headingProject);
    projectContent.appendChild(descriptionProject);

    link.appendChild(linkImg);
    projectLinks.appendChild(link);

    cardProjects.appendChild(projectContent);
    cardProjects.appendChild(projectLinks);

    projectContainer.appendChild(cardProjects);
  });
}

loadGithub();
