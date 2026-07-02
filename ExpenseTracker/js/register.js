let form = document.querySelector("form");

let users = JSON.parse(localStorage.getItem("users")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target[0].value.trim();
  let password = e.target[1].value.trim();

  if (username === "" || password === "") {
    alert("username or password are blank!");
    return;
  }
 
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    alert("Username already occupied");
    form.reset();
    return;
  }
  
  let user = {
    username,
    password,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration completed! now you can login");

  form.reset();

  location.href = "./login.html";
});
