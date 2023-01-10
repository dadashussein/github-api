// Element selector
const gitHubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const gitHub = new Github();
const ui = new UI();

// Event Listener
eventListeners();
function eventListeners() {
  gitHubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

// Event Functions
function getData(e) {
  let username = nameInput.value.trim();
  if (username === "") {
    alert("Zəhmət olmasa, istifadəçi adını daxil edin!");
  } else {
    gitHub
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
            ui.showError("İstifadəçi tapılmadı!");
        } else {
            ui.addSearchDataToUI(username);
            Storage.addSearchDataToStorage(username);
            ui.showUserInfo(response.user);
            ui.showRepoInfo(response.repo);
        }
      })
      .catch((err) => ui.showError(err));
  }
  ui.clearInput(); // Clear input
  e.preventDefault(); // Prevent default
}

function clearAllSearched() {
  // Clear all searched
    if (confirm("Əminsiniz?")) {
        Storage.clearAllSearchDataFromStorage();
        ui.clearAllSearchedFromUI();
    }
    
}

function getAllSearched() {
  // All searched add to UI

  let users = Storage.getSearchDataFromStorage();

    let result = "";
    users.forEach((user) => {
        result += `<li class="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML = result;

}
