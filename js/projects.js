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
  const response = await fetch(GithubPath, {
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    throw new Error (
      `GitHub API error: ${response.status}`
    );
  }

  const projects = await response.json();

  return projects;
}

const githubUrl =
  "https://api.github.com/users/nathalie-bjorkman/repos?per_page=100";

async function loadGithub() {
  const statusMessage = document.querySelector("#github-status");
  const projectContainer = document.querySelector(".projects-container");

  // Visa loading
  statusMessage.textContent = "Loading projects from GitHub...";
  statusMessage.className = "github-status loading";

  try {
    const projects = await fetchGithub(githubUrl);

    // Repositories som inte ska visas, 
  // kan lägga till fler direkt här, utan att behöva ändra i myProjects funtionen här nere
  const excludedProjects = ["u03---Projektarbet--quiz-app-grupp-7"];

  const myProjects = projects.filter((project) => {
    return (

      // Filtrering av projekt från GitHub
      // Filter går igenom alla repositories
      // !project.fork gör att det inte visas repositories som är forks
      // !project.archived gör att det inte visas arkiverade projekt
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

  // Kontrollera om listan är tom
  if (myProjects.length === 0){
    statusMessage.textContent = "No projects available right now.";

     statusMessage.className = "github-status empty";
     return;
  }

  // Loading är färdig 
  statusMessage.textContent = "";
  statusMessage.className = "github-status";

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

   } catch (error) {
        console.error("Could not load GitHub projects:", error);

        statusMessage.textContent =
            "Sorry! Could not load projects right now. Please try again later.";

        statusMessage.className = "github-status error";
    }

  }

  

loadGithub();
