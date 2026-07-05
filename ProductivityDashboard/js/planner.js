function initPlanner() {
  let plannerList = document.querySelector(".planner-list");

  const hours = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  let planArr = JSON.parse(localStorage.getItem("planner")) || [];

  function ui() {
    plannerList.innerHTML = "";

    hours.forEach((hour, idx) => {
      let savedPlan = planArr.find((plan) => plan.id == idx);

      plannerList.innerHTML += `
        <div class="planner-row">

          <span class="planner-time">
            ${hour}
          </span>

          <input
            type="text"
            class="planner-input"
            placeholder="Nothing planned..."
            data-id="${idx}"
            value="${savedPlan ? savedPlan.value : ""}"
          >

        </div>
      `;
    });
  }
  
  ui();
  
  plannerList.addEventListener("change", (e) => {
    let plannerInput = e.target.closest(".planner-input");

    if (!plannerInput) return;

    let id = plannerInput.dataset.id;
    let value = plannerInput.value.trim();

    const index = planArr.findIndex((plan) => plan.id == id);
    
    if (index !== -1) {
      planArr[index].value = value;
    } else {
      planArr.push({
        id,
        value,
      });
    }
    localStorage.setItem("planner", JSON.stringify(planArr));
    
  });
}

export default initPlanner;
