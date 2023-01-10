class Storage {
  static getSearchDataFromStorage() {
    // Get data from storage

    let users;
    if (localStorage.getItem("searched") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("searched"));
    }
    return users;
  }

  static addSearchDataToStorage(username) {
    // Add data to storage

    let users = this.getSearchDataFromStorage();
    // If there is no such user in storage
    if (users.indexOf(username) === -1) {
      users.push(username);
    }
    localStorage.setItem("searched", JSON.stringify(users));
  }
  static clearAllSearchDataFromStorage() {
    // Clear all data from storage
    localStorage.removeItem("searched");
  }
}
