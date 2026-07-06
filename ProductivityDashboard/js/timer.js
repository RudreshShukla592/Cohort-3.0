function initTimer() {
  let timer = document.querySelector("#timer");
  let startBtn = document.querySelector("#startBtn");
  let pauseBtn = document.querySelector("#pauseBtn");
  let resetBtn = document.querySelector("#resetBtn");

  let minutes = 25;
  let seconds = 0;
  let interval = null;

  let ui = () => {
    timer.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
  };


  startBtn.addEventListener("click", () => {
    if (interval) return;
    startBtn.classList.add("primary");
    pauseBtn.classList.remove("primary");
    resetBtn.classList.remove("primary");

    ui();
    interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        interval = null;
        return;
      }

      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      ui();
    }, 1000);
  });

  pauseBtn.addEventListener("click", () => {
    startBtn.classList.remove("primary");
    pauseBtn.classList.add("primary");
    resetBtn.classList.remove("primary");

    clearInterval(interval);
    interval = null;
  });

  resetBtn.addEventListener("click", () => {
    startBtn.classList.remove("primary");
    pauseBtn.classList.remove("primary");
    resetBtn.classList.add("primary");

    clearInterval(interval);
    interval = null;
    minutes = 25;
    seconds = 0;
    ui()
  });
  
  ui()
}

export default initTimer;
