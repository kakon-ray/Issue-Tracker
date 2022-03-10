document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

// const closeIssue = (id) => {
//   const issues = JSON.parse(localStorage.getItem("issues"));
//   const currentIssue = issues.find((issue) => issue.id === id);
//   currentIssue.status = "Closed";
//   localStorage.setItem("issues", JSON.stringify(issues));
//   fetchIssues();
// };

const deleteIssue = (id) => {
  var remainingIssues;
  const issues = JSON.parse(localStorage.getItem("issues"));

  issues.forEach((issue) => {
    if (parseInt(issue.id) === id) {
      issues.splice(issues.indexOf(issue), 1);
      console.log(issues);
    }
  });

  localStorage.setItem("issues", JSON.stringify(issues));
  location.reload();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well" id = "closed">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
};

function setStatusClosed(id) {
  var remainingIssues;
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.querySelectorAll(".well");

  issues.forEach((issue, index) => {
    if (parseInt(issue.id) === id) {
      const index = issues.indexOf(issue);
      console.log(issuesList[index]);
      issuesList[index].parentNode.removeChild(issuesList[index]);
    }
  });
}
