let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target[0].value.trim();
  let password = e.target[1].value.trim();

  if (username === "" || password === "") {
    alert("Username or Password cannot be empty");
    return;
  }

  let savedUsers = JSON.parse(localStorage.getItem("users")) || [];
  let userLogged

  let savedName = savedUsers.find((user) => user.username === username);
  if (savedName) {
    if (savedName.password === password) {
      userLogged = savedName;
    } else {
      alert("Wrong Password");
      form.reset();
      return;
    }
  } else {
    alert("User not found");
    form.reset();
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(userLogged));
  form.reset();
  location.href = "./dashboard.html";
});
