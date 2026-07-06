function initWeather() {
  let weatherLocation = document.querySelector("#weatherLocation");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feelsLike");
  let weatherCondition = document.querySelector("#weatherCondition");
  let bgLayer = document.querySelector(".weather-card");

  const weatherCodes = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Fog 🌫️",
    51: "Light Drizzle 🌦️",
    61: "Rain 🌧️",
    71: "Snow ❄️",
    80: "Rain Showers 🌦️",
    95: "Thunderstorm ⛈️",
  };

  async function fetchWeather() {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
      );

      const data = await response.json();

      weatherLocation.textContent = "New Delhi, India";

      temperature.textContent = `${data.current.temperature_2m}°C`;
      humidity.textContent = `${data.current.relative_humidity_2m}%`;
      wind.textContent = `${data.current.wind_speed_10m} km/h`;
      feelsLike.textContent = `${data.current.apparent_temperature}°C`;
      weatherCondition.textContent =
        weatherCodes[data.current.weather_code] || "Unknown";
    } catch (error) {
      console.error(error);
      weatherCondition.textContent = "Failed to load weather";
    }

    const hour = new Date().getHours();

    bgLayer.classList.remove("morning", "afternoon", "evening", "night");

    if (hour >= 6 && hour <= 11) {
      bgLayer.classList.add("morning");
    } else if (hour >= 12 && hour <= 16) {
      bgLayer.classList.add("afternoon");
    } else if (hour >= 17 && hour <= 19) {
      bgLayer.classList.add("evening");
    } else {
      bgLayer.classList.add("night");
    }
  }

  fetchWeather();
}

export default initWeather;
