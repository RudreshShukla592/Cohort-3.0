const h1 =
document.getElementById("title");

h1.style.color='red'
h1.style.fontSize="50px"

console.log(h1.classList.contains("h1"));

h1.classList.replace("h1","heading")

console.log(h1.classList.contains("heading"));
