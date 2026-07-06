function initClock() {
  let clock = document.querySelector("#liveClock");
  let date = document.querySelector("#liveDate");

  let ui = () => {
    let now = new Date();

    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    clock.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;

    date.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  ui();

  setInterval(() => {
    ui();
  }, 1000);
}

export default initClock;
