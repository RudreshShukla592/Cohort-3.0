/* THEME LOGIC*/
let themeSlider = document.querySelector("#theme-toggle");
let html = document.querySelector("html");

themeSlider.addEventListener("change", () => {
  if (themeSlider.checked) {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});
let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);

  if (savedTheme === "dark") {
    themeSlider.checked = true;
  } else {
    themeSlider.checked = false;
  }
}

/* Route Protection and Logout logic*/
let username = document.querySelector(".username");
let logOut = document.querySelector(".logOut-btn")
let userLogged = JSON.parse(localStorage.getItem("currentUser"))
if(!userLogged){
  alert("Unauthorized access")
  location.href = "./login.html";
  // return
}
else{
  username.textContent = userLogged.username
}
logOut.addEventListener("click",()=>{
   localStorage.removeItem("currentUser")
   location.href = "./login.html";
})

/* add trans. btn added*/
let transactionBtn = document.querySelector(".transaction-btn")
let transactionModal = document.querySelector(".transaction-modal")
let cross = document.querySelector(".cross")
transactionBtn.addEventListener("click",()=>{
  transactionModal.classList.remove("hidden")
})
cross.addEventListener("click",()=>{
  transactionModal.classList.add("hidden")
})


let transactionForm = document.querySelector(".transaction-form")
let transactionBody = document.querySelector("#transaction-body")

let transactions = JSON.parse(localStorage.getItem("transactions")) || []
let ui = ()=>{
  transactionBody.innerHTML = ""
  transactions.forEach((e,idx)=>{
    transactionBody.innerHTML+= `<tr>
                  <td>${e.date}</td>

                  <td class="transaction-description">${e.des}</td>

                  <td>
                    <span class="category-tag">${e.category}</span>
                  </td>

                  <td class="${e.type === "income" ? "income" : "expense"}">${e.type === "income" ? "+" : "-"} $${e.amount}</td>

                  <td>
                    <button onclick="update('${idx}')" class="edit-btn">
                      <i class="ri-pencil-fill"></i>
                    </button>

                    <button onclick="del(${idx})" class="delete-btn">
                      <i  class="ri-delete-bin-6-fill"></i>
                    </button>
                  </td>
                </tr>`
  })
}
ui()

transactionForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  let type = e.target[0].value
  let des = e.target[1].value
  let amount = e.target[2].value
  let date = e.target[3].value
  let category = e.target[4].value

  let obj={
    type,
    des,
    amount,
    date,
    category
  }

  if(updateIdx!== null){
      transactions[updateIdx] =  obj
      updateIdx = null
      localStorage.setItem("transactions", JSON.stringify(transactions))
  }else{
     transactions.unshift(obj)
     localStorage.setItem("transactions", JSON.stringify(transactions))
  }
  ui()
   
  transactionForm.reset()
  transactionModal.classList.add("hidden")
})

let del = (id)=>{
    transactions.splice(id,1)
    localStorage.setItem("transactions", JSON.stringify(transactions))
    ui()
}

let updateIdx = null;
let update = (idx)=>{
  transactionModal.classList.remove("hidden")
  updateIdx = idx;
  let currentTransaction = transactions[idx];

  transactionForm[0].value = currentTransaction.type
  transactionForm[1].value = currentTransaction.des
  transactionForm[2].value = currentTransaction.amount
  transactionForm[3].value = currentTransaction.date
  transactionForm[4].value = currentTransaction.category
}

// reset btn

let resetBtn = document.querySelector(".reset-btn")
resetBtn.addEventListener("click",()=>{
  transactions.length = 0
  localStorage.setItem("transactions", JSON.stringify(transactions))
  ui()
})