// make footer and add it to the page
const body = document.body;
const footer = document.createElement("footer");
body.appendChild(footer);

// get current year
const today = new Date();
const thisYear = today.getFullYear();

// put copyright in footer
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Sadia Rimsha ${thisYear}`;
footer.appendChild(copyright);

// make list of skills
const skills = ["GitHub", "Jira", "Monday.com", "HTML", "CSS", "JavaScript"];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

// add each skill to skills list
skills.forEach((skill) => {
  const li = document.createElement("li");
  li.textContent = skill;
  skillsList.appendChild(li);
});

// get the form
const messageForm = document.forms["leave_message"];

// when form is submitted do this
messageForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page from reloading

  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;

  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  // make new message and show name as email link
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${email}">${name}</a>: ${message}`;

  // make remove button for message
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";

  // remove message when button clicked
  removeButton.addEventListener("click", () => {
    newMessage.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  // clear form fields
  messageForm.reset();
});

// get GitHub repos
fetch("https://api.github.com/users/sadiarimsha/repos")
  .then((response) => response.json())
  .then((repos) => {
    const projectsSection = document.getElementById("projects");
    const projectList = projectsSection.querySelector("ul");

    // add each repo as a link
    repos.forEach((repo) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = repo.name;
      link.target = "_blank";

      li.appendChild(link);
      projectList.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Error fetching GitHub repos:", error);
  });

// show/hide sections and scroll when nav clicked
document.addEventListener("DOMContentLoaded", () => {
  const navProjects = document.getElementById("nav-projects");
  const projectsSection = document.getElementById("projects");

  function hideSections() {
    if (projectsSection) projectsSection.style.display = "none";
  }

  // hide all sections at start
  hideSections();

  // when projects link clicked, show projects section and scroll to it
  if (navProjects && projectsSection) {
    navProjects.addEventListener("click", (e) => {
      e.preventDefault();
      hideSections();
      projectsSection.style.display = "block";

      // scroll to the projects section smoothly
      projectsSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});
