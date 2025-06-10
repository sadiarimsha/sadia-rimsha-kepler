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

  console.log(nameInput, emailInput, messageInput);

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

    console.log(repositories);
  })
  .catch((error) => {
    console.log("Something went wrong. Could not fetch the projects.", error);
  });

// 🆕 Fetch and display weather
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
      console.error("Failed to fetch weather data:", error);
      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.innerText = "Unable to load weather data.";
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const navProjects = document.getElementById("nav-projects");
  const navQuotes = document.getElementById("nav-quotes");

  const projectsSection = document.getElementById("projects");
  const quoteSection = document.getElementById("quote");

  function hideSections() {
    if (projectsSection) projectsSection.style.display = "none";
    if (quoteSection) quoteSection.style.display = "none";
  }

  function fetchQuote() {
    fetch(
      "https://api.jsongpt.com/json?prompt=Generate%201%20motivational%20quotes%20&quotes=array%20of%20quotes"
    )
      .then((response) => response.json())
      .then((data) => {
        let quoteText = document.getElementById("quote-text");
        if (quoteText && data.quotes && data.quotes.length > 0) {
          quoteText.innerText = `${data.quotes[0]}`;
        } else if (quoteText) {
          quoteText.innerText = "Quote unavailable.";
        }
        console.log(data);
      })
      .catch((error) => {
        console.log("Could not fetch quote", error);
        let quoteText = document.getElementById("quotes");
        if (quoteText) quoteText.innerText = "Could not load quote.";
      });
  }

  if (navProjects && projectsSection) {
    navProjects.addEventListener("click", (e) => {
      e.preventDefault();
      hideSections();
      projectsSection.style.display = "block";
    });
  }

  if (navQuotes && quoteSection) {
    navQuotes.addEventListener("click", (e) => {
      e.preventDefault();
      hideSections();
      quoteSection.style.display = "block";
      fetchQuote();
    });
  }

  hideSections();

  fetchWeather();
});
