function getUsers() {
  fetch("https://60c98aa8772a760017203b57.mockapi.io/users", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((users) => {
      const allUsers = document.querySelector(".users");
      users.forEach((user) => {
        // user container
        const userConatiner = document.createElement("div");
        userConatiner.className = "user-container";

        userConatiner.innerHTML = `
          <img class="user-avatar" src="${user.avatar}" alt="Profile">
          <h4 class="user-name">${user.name}</h4>
          <p class="user-joined"> ${new Date(user.createdAt).toDateString()}</p>
          <button class="user-edit" onclick="editUser('${user.name}', ${
          user.id
        }, '${user.avatar}')"> Edit </button>
          <button class="user-delete" onclick="deleteUser(${
            user.id
          })"> Delete </button> 
        `;
        allUsers.append(userConatiner);
      });
      return users;
    });
}

getUsers();

function refreshUsers() {
  console.log("Refresh the users");
  document.querySelector(".users").innerHTML = "";
  getUsers();
}

function deleteUser(userId) {
  console.log("Delete User.... ", userId);
  fetch(`https://60c98aa8772a760017203b57.mockapi.io/users/${userId}`, {
    method: "DELETE",
  })
    .then((data) => data.json())
    .then((user) => refreshUsers());
}

function addUser() {
  const type = document.querySelector(".submit-user").innerText;
  console.log("The type is ...", type);
  const userName = document.querySelector(".add-user-name").value;
  const userProfilePic = document.querySelector(".add-user-pic").value;

  const urlMethod = type === "Edit User" ? "PUT" : "POST";
  const userId = type === "Edit User" ? localStorage.getItem("userId") : "";
  // DRY - Dont Repeat Yourself
  fetch(`https://60c98aa8772a760017203b57.mockapi.io/users/${userId}`, {
    method: urlMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createdAt: new Date().toISOString(),
      name: userName,
      avatar: userProfilePic,
    }),
  })
    .then((data) => data.json())
    .then((user) => refreshUsers());

  formReset();
}

function formReset() {
  document.querySelector(".add-user-name").value = "";
  document.querySelector(".add-user-pic").value = "";
  document.querySelector(".submit-user").innerText = "Add User";
}

// Using Put method
function editUser(userName, userId, userAvatar) {
  document.querySelector(".add-user-name").value = userName;
  document.querySelector(".add-user-pic").value = userAvatar;
  document.querySelector(".submit-user").innerText = "Edit User";
  localStorage.setItem("userId", userId);
}

// Put on monday
