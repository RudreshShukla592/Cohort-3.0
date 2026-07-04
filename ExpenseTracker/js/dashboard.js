/* THEME LOGIC*/
let themeSlider = document.querySelector("#theme-toggle");
let html = document.querySelector("html");

let balanceData = document.querySelector(".current");
let incomeData = document.querySelector(".income-data");
let expenseData = document.querySelector(".expense-data");
let transactionData = document.querySelector(".transaction-data");

let searchInput = document.querySelector(".search-input");
let filterSelect = document.querySelector(".filter-select");

let ctx = document.querySelector("#financeChart");

// setting & dashboard toggle
let settings = document.querySelector(".settings");
let dashboard = document.querySelector(".mid");

let dashboardBtn = document.querySelector("#dashboard-btn");
let settingsBtn = document.querySelector("#settings-btn");

dashboardBtn.addEventListener("click", () => {
  dashboard.classList.remove("hidden");
  settings.classList.add("hidden");
});
settingsBtn.addEventListener("click", () => {
  settings.classList.remove("hidden");
  dashboard.classList.add("hidden");
});

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
let logOut = document.querySelector(".logOut-btn");
let userLogged = JSON.parse(localStorage.getItem("currentUser"));
if (!userLogged) {
  alert("Unauthorized access");
  location.href = "./index.html";
  // return
} else {
  username.textContent = userLogged.username;
}
logOut.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.href = "./index.html";
});

/* add trans. btn added*/
let transactionBtn = document.querySelector(".transaction-btn");
let transactionModal = document.querySelector(".transaction-modal");
let cross = document.querySelector(".cross");
transactionBtn.addEventListener("click", () => {
  transactionModal.classList.remove("hidden");
});
cross.addEventListener("click", () => {
  transactionModal.classList.add("hidden");
});

let transactionForm = document.querySelector(".transaction-form");
let transactionBody = document.querySelector("#transaction-body");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const storageKey = `transactions_${currentUser.username}`;

let transactions = JSON.parse(localStorage.getItem(storageKey)) || [];

const financeChart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: ["Income", "Expense"],

    datasets: [
      {
        label: "Cash Flow",

        data: [0, 0],

        backgroundColor: ["#10b981", "#ef4444"],

        borderRadius: 8,

        borderWidth: 0,
      },
    ],
  },

  options: {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

searchInput.addEventListener("input", (e) => {
  let data = e.target.value.toLowerCase();
  let filterData = transactions.filter((e) =>
    e.des.toLowerCase().includes(data),
  );
  ui(filterData);
});

filterSelect.addEventListener("change", (e) => {
  let data = e.target.value.toLowerCase().trim();

  if (data === "alltypes") {
    ui(transactions);
    return;
  }

  let filterData = transactions.filter((e) => e.type === data);

  ui(filterData);
});

let ui = (arr) => {
  transactionBody.innerHTML = "";
  arr.forEach((e, idx) => {
    transactionBody.innerHTML += `<tr>
                  <td>${e.date}</td>

                  <td class="transaction-description">${e.des}</td>

                  <td>
                    <span class="category-tag">${e.category}</span>
                  </td>

                  <td class="${e.type === "income" ? "income" : "expense"}">${e.type === "income" ? "+" : "-"} ${currentUser.currency || "$"}${e.amount}</td>

                  <td>
                    <button onclick="update(${e.id})" class="edit-btn">
                      <i class="ri-pencil-fill"></i>
                    </button>

                    <button onclick="del(${e.id})" class="delete-btn">
                      <i  class="ri-delete-bin-6-fill"></i>
                    </button>
                  </td>
                </tr>`;
  });

  transactionData.textContent = transactions.length;

  const incomeArr = transactions.filter((e) => e.type === "income");
  const incomeTotal = incomeArr.reduce(
    (acc, val) => acc + Number(val.amount),
    0,
  );

  const expenseArr = transactions.filter((e) => e.type === "expense");
  const expenseTotal = expenseArr.reduce(
    (acc, val) => acc + Number(val.amount),
    0,
  );

  incomeData.textContent = `${currentUser.currency || "$"}${incomeTotal}`;
  expenseData.textContent = `${currentUser.currency || "$"}${expenseTotal}`;
  balanceData.textContent = `${currentUser.currency || "$"}${incomeTotal - expenseTotal}`;

  financeChart.data.datasets[0].data = [incomeTotal, expenseTotal];

  financeChart.update();
};
ui(transactions);

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let type = e.target[0].value;
  let des = e.target[1].value;
  let amount = e.target[2].value;
  let date = e.target[3].value;
  let category = e.target[4].value;

  let obj = {
    id: Date.now(),
    type,
    des,
    amount,
    date,
    category,
  };

  if (updateIdx !== null) {
    transactions[updateIdx] = obj;
    updateIdx = null;
    localStorage.setItem(storageKey, JSON.stringify(transactions));
  } else {
    transactions.unshift(obj);
    localStorage.setItem(storageKey, JSON.stringify(transactions));
  }
  ui(transactions);

  transactionForm.reset();
  transactionModal.classList.add("hidden");
});

let del = (id) => {
  let delTransaction = transactions.findIndex((e) => e.id === id);
  transactions.splice(delTransaction, 1);
  localStorage.setItem(storageKey, JSON.stringify(transactions));
  ui(transactions);
};

let updateIdx = null;
let update = (id) => {
  transactionModal.classList.remove("hidden");
  updateIdx = transactions.findIndex((e) => e.id === id);
  let currentTransaction = transactions[updateIdx];

  transactionForm[0].value = currentTransaction.type;
  transactionForm[1].value = currentTransaction.des;
  transactionForm[2].value = currentTransaction.amount;
  transactionForm[3].value = currentTransaction.date;
  transactionForm[4].value = currentTransaction.category;
};

// reset btn

let resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  transactions.length = 0;
  localStorage.setItem(storageKey, JSON.stringify(transactions));
  ui(transactions);
});

// settings logic
let settingsForm = document.querySelector(".settings-form");
let profileNameSettings = document.querySelector(".profile-name");
let currencySelect = document.querySelector(".currency-select");

profileNameSettings.value = currentUser.username;
currencySelect.value = currentUser.currency || "$";

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newUser = e.target[0].value.trim();
  let newCurrency = e.target[1].value;

  let oldUsername = currentUser.username;

  currentUser.username = newUser;
  currentUser.currency = newCurrency;

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  if(oldUsername !== newUser){
    const oldStorageKey = `transactions_${oldUsername}`;
    const newStorageKey = `transactions_${newUser}`;

    const oldTransactions = JSON.parse(localStorage.getItem(oldStorageKey)) || [];

    localStorage.setItem(newStorageKey, JSON.stringify(oldTransactions));
    localStorage.removeItem(oldStorageKey)
  }

  let savedUsers = JSON.parse(localStorage.getItem("users")) || [];
  let idx = savedUsers.findIndex((e) => e.username === oldUsername);
  if(idx !== -1) {
    savedUsers[idx].username = newUser;
    savedUsers[idx].currency = newCurrency;

    localStorage.setItem("users", JSON.stringify(savedUsers));
  }

  username.textContent = newUser;

  alert("Profile updated successfully!");

  ui(transactions);
});
