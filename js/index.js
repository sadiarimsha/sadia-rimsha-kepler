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
