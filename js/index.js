// ===== Add copyright year to the footer =====
const body = document.body;
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Sadia Rimsha ${thisYear}`;
footer.appendChild(copyright);

// ===== Add skills using JavaScript =====
const skills = ["GitHub", "Jira", "Monday.com", "HTML", "CSS", "JavaScript"];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

skills.forEach((skill) => {
  const li = document.createElement("li");
  li.textContent = skill;
  skillsList.appendChild(li);
});

// ===== Handle the "Leave a Message" form =====
const messageForm = document.forms["leave_message"];

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;

  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${email}">${name}</a>: ${message}`;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", () => {
    newMessage.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});

// ===== Fetch GitHub repositories and show them in Projects =====
fetch("https://api.github.com/users/sadiarimsha/repos")
  .then((response) => response.json())
  .then((repos) => {
    const projectsSection = document.getElementById("projects");
    const projectList = projectsSection.querySelector("ul");

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

// ===== Fetch current weather temperature (°F) from Open-Meteo API =====
function fetchWeather() {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=41.7859&longitude=-88.1473&hourly=temperature_2m&timezone=America%2FChicago"
  )
    .then((response) => response.json())
    .then((data) => {
      const currentHour = new Date().getHours();
      const celsius = data.hourly.temperature_2m[currentHour];
      const fahrenheit = (celsius * 9) / 5 + 32;
      const time = data.hourly.time[currentHour];

      const weatherInfo = document.getElementById("weather-info");
      weatherInfo.textContent = `Current Temperature (${time}): ${fahrenheit.toFixed(
        1
      )}°F`;
    })
    .catch((error) => {
      const weatherInfo = document.getElementById("weather-info");
      weatherInfo.textContent = "Unable to load weather data.";
      console.error("Weather API error:", error);
    });
}

// ===== Page Load Actions =====
document.addEventListener("DOMContentLoaded", () => {
  // Optional: Navigation toggles for Projects section
  const navProjects = document.getElementById("nav-projects");
  const projectsSection = document.getElementById("projects");

  function hideSections() {
    if (projectsSection) projectsSection.style.display = "none";
  }

  if (navProjects && projectsSection) {
    navProjects.addEventListener("click", (e) => {
      e.preventDefault();
      hideSections();
      projectsSection.style.display = "block";
    });
  }

  hideSections();
  fetchWeather();
});
