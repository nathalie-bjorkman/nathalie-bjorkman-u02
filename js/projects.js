

async function fetchGithub(GithubPath) {
  const response = await fetch(GithubPath, {
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const projects = await response.json();

  return projects;
}

// GitHub API
const githubUrl =
  "https://api.github.com/users/nathalie-bjorkman/repos?per_page=100";

// Hämta språk från varje repository
async function fetchTechStack(project) {
  try {
    const languages = await fetchGithub(project.languages_url);

    return Object.keys(languages).join(" · ");
  } catch (error) {
    console.error("Could not fetch tech stack:", error);

    return "Not available";
  }
}

// Hämta och visa projekt
async function loadGithub() {
  const statusMessage = document.querySelector("#github-status");
  const projectContainer = document.querySelector(".projects-container");

  // Visa loading
  statusMessage.textContent = "Loading projects from GitHub...";
  statusMessage.className = "github-status loading";

  try {
    const projects = await fetchGithub(githubUrl);

    // Repositories som inte ska visas
    const excludedProjects = ["u03---Projektarbet--quiz-app-grupp-7"];

    // Filtrera bort forks, arkiverade och exkluderade projekt
    const myProjects = projects.filter((project) => {
      return (
        !project.fork &&
        !project.archived &&
        !excludedProjects.includes(project.name)
      );
    });

    // Sortera efter senaste uppdatering
    myProjects.sort((a, b) => {
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });

    // Kontrollera om listan är tom
    if (myProjects.length === 0) {
      statusMessage.textContent = "No projects available right now.";

      statusMessage.className = "github-status empty";

      return;
    }

    // Skapa projektkorten
    // Promise.all väntar tills alla kort har skapats
    const projectCards = await Promise.all(
      myProjects.map(async (project) => {
        // Skapa HTML-element
        const cardProjects = document.createElement("article");

        const projectContent = document.createElement("div");
        const projectLinks = document.createElement("div");

        const headingProject = document.createElement("h2");
        const descriptionProject = document.createElement("p");

        const techStackTitle = document.createElement("h3");
        const techStackProject = document.createElement("p");

        const linkImg = document.createElement("img");
        const link = document.createElement("a");

        // Lägg in information från GitHub
        headingProject.textContent = project.name;

        descriptionProject.textContent =
          project.description ?? "No description available.";

        link.href = project.html_url;
        link.textContent = "View Code";

        // Hämta Tech Stack
        techStackTitle.textContent = "Tech Stack";

        techStackProject.textContent = await fetchTechStack(project);

        // Lägg till CSS-klasser
        projectContent.classList.add("project-content");
        projectLinks.classList.add("project-links");

        cardProjects.classList.add("project");

        headingProject.classList.add("project-title-content");
        descriptionProject.classList.add("under-project-title");

        techStackTitle.classList.add("what-tech-stack");
        techStackProject.classList.add("tech-stack-project");

        linkImg.classList.add("view-code");
        link.classList.add("view-code-text");

        // GitHub-ikon
        linkImg.src = "../assets/assets-projects/github.png";
        linkImg.alt = "";

        // Bygg projektkortet
        projectContent.appendChild(headingProject);
        projectContent.appendChild(descriptionProject);
        projectContent.appendChild(techStackTitle);
        projectContent.appendChild(techStackProject);

        link.appendChild(linkImg);
        projectLinks.appendChild(link);

        cardProjects.appendChild(projectContent);
        cardProjects.appendChild(projectLinks);

        // Returnera det färdiga kortet
        return cardProjects;
      }),
    );

    // Visa projektkorten på sidan
    projectCards.forEach((card) => {
      projectContainer.appendChild(card);
    });

    // Loading är färdig
    statusMessage.textContent = "";
    statusMessage.className = "github-status";
  } catch (error) {
    // Felhantering
    console.error("Could not load GitHub projects:", error);

    statusMessage.textContent =
      "Sorry! Could not load projects right now. Please try again later.";

    statusMessage.className = "github-status error";
  }
}

// Starta funktionen
loadGithub();
