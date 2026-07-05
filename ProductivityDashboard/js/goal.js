function initGoal() {
  let goalForm = document.querySelector(".goal-form");
  let goalList = document.querySelector(".goal-list");
  let goalCount = document.querySelector("#goalCount")

  let goalArr = JSON.parse(localStorage.getItem("goals")) || [];

  let ui = () => {
    goalList.innerHTML = "";
    goalArr.forEach((e,idx) => {
      goalList.innerHTML += `<li class="goal-item ${e.completed? "completed":""}">

                <button data-id="${idx}"  class="goal-complete">
                    <i  class="ri-check-line"></i>
                </button>

                <p class="goal-text">
                    ${e.title}
                </p>

                <button data-id="${idx}" class="goal-delete">
                    <i class="ri-close-line"></i>
                </button>

            </li>`;
    });

    let completeArr = goalArr.filter((goal)=> goal.completed === true)
    goalCount.textContent = `${completeArr.length} of ${goalArr.length} completed`
  };
  ui();
  
  goalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = e.target[0].value.trim();

    if (!title) return;

    let obj = {
      title,
      completed: false,
    };
    goalArr.unshift(obj);
    localStorage.setItem("goals", JSON.stringify(goalArr));
    ui();

    goalForm.reset();
  });

  goalList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".goal-delete");
    const completeBtn = e.target.closest(".goal-complete")

    if (deleteBtn) {
      let id = deleteBtn.getAttribute("data-id");
      goalArr.splice(id, 1);
      localStorage.setItem("goals", JSON.stringify(goalArr));
      ui();
    }

    if(completeBtn){
        let id = completeBtn.getAttribute("data-id");

        goalArr[id].completed= !goalArr[id].completed
        localStorage.setItem("goals", JSON.stringify(goalArr));
        ui();
    }
  });

}

export default initGoal;
