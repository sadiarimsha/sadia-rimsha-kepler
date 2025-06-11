let body = document.body;
let footer = document.createElement("footer");
body.appendChild(footer);

let today = new Date();
let thisYear = today.getFullYear();

let footerElement = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = "© Sadia Rimsha " + thisYear;
footerElement.appendChild(copyright);

let skills = ["GitHub", "Jira", "Monday.com"];
let skillsSection = document.getElementById("skills");
let skillsList = skillsSection.querySelector("ul");

skills.forEach((skill) => {
  let li = document.createElement("li");
  li.innerText = skill;
  skillsList.appendChild(li);
});

let messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let nameInput = document.getElementById("usersName").value;
  let emailInput = document.getElementById("usersEmail").value;
  let messageInput = document.getElementById("usersMessage").value;

  let messageSection = document.getElementById("messages");
  let messageList = messageSection.querySelector("ul");

  let newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${emailInput}">${nameInput}</a><span>: ${messageInput}</span>`;

  let removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", () => {
    newMessage.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});

fetch("https://api.github.com/users/sadiarimsha/repos")
  .then((response) => response.json())
  .then((repositories) => {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return;

    const projectList = projectsSection.querySelector("ul");
    if (!projectList) return;

    repositories.forEach((repo) => {
      let li = document.createElement("li");
      li.innerText = repo.name;
      projectList.appendChild(li);
    });
  })
  .catch((error) => {
    console.log("Something went wrong. Could not fetch the projects.", error);
  });

function fetchWeather() {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=41.7859&longitude=-88.1473&hourly=temperature_2m&timezone=America%2FChicago"
  )
    .then((response) => response.json())
    .then((data) => {
      const currentHour = new Date().getHours();
      const temp = data.hourly.temperature_2m[currentHour];
      const time = data.hourly.time[currentHour];

      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.innerText = `Current Temperature (${time}): ${temp}°F`;
      }
    })
    .catch((error) => {
      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.innerText = "Unable to load weather data.";
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const navProjects = document.getElementById("nav-projects");
  const navWeather = document.getElementById("nav-weather");

  const projectsSection = document.getElementById("projects");
  const weatherSection = document.getElementById("weather");

  function hideSections() {
    if (projectsSection) projectsSection.style.display = "none";
    if (weatherSection) weatherSection.style.display = "none";
  }

  if (navProjects && projectsSection) {
    navProjects.addEventListener("click", (e) => {
      e.preventDefault();
      hideSections();
      projectsSection.style.display = "block";
    });
  }

  if (navWeather && weatherSection) {
    navWeather.addEventListener("click", (e) => {
      e.preventDefault();
      hideSections();
      weatherSection.style.display = "block";
      fetchWeather();
    });
  }

  hideSections();

  fetchWeather();
});
