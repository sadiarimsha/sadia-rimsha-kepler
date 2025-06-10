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
for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

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

  removeButton.addEventListener("click", function () {
    let entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});
fetch("https://api.github.com/users/sadiarimsha/repos")
  .then(function (response) {
    return response.json();
  })
  .then(function (repositories) {
    let projectSection = document.getElementById("projects");
    let projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      let project = document.createElement("li");
      project.innerText = repositories[i].name;
      projectList.appendChild(project);
    }
    console.log(repositories);
  })
  .catch(function (error) {
    console.log("Something went wrong. Could not fetch the projects.", error);
  });
