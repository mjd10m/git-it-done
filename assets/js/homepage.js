/*function getUserRepos() {
    console.log("function was called");
};*/

function getUserRepos() {
    fetch("https://api.github.com/users/octocat/repos");
  };
  

getUserRepos();