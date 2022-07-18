var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");

function formSubmitHandler(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("please enter a GitHub Username")
    }
}

function getUserRepos(user) {
    var apiURL = "https://api.github.com/users/" + user + "/repos";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user)
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
};

function displayRepos(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found";
    }
    repoContainerEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm;
    for (i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);
        repoContainerEl.appendChild(repoEl);

        var statusEl = document.createElement("span")
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.appendChild(statusEl);
    }
}
  


userFormEl.addEventListener("submit", formSubmitHandler);