// weather.js — Weather Widget feature.
// Uses Open-Meteo (free, no API key) for weather + BigDataCloud (free, no key)
// for reverse-geocoding the location name.

const DEFAULT_COORDS = { latitude: 26.8467, longitude: 80.9462, label: 'Lucknow (default)' };

// WMO weather codes -> readable text + emoji icon.
const WEATHER_CODES = {
  0: ['Clear sky', '☀️'], 1: ['Mainly clear', '🌤️'], 2: ['Partly cloudy', '⛅'], 3: ['Overcast', '☁️'],
  45: ['Fog', '🌫️'], 48: ['Fog', '🌫️'],
  51: ['Light drizzle', '🌦️'], 53: ['Drizzle', '🌦️'], 55: ['Dense drizzle', '🌦️'],
  61: ['Light rain', '🌧️'], 63: ['Rain', '🌧️'], 65: ['Heavy rain', '🌧️'],
  71: ['Light snow', '🌨️'], 73: ['Snow', '🌨️'], 75: ['Heavy snow', '🌨️'],
  80: ['Rain showers', '🌦️'], 81: ['Rain showers', '🌦️'], 82: ['Violent showers', '⛈️'],
  95: ['Thunderstorm', '⛈️'], 96: ['Thunderstorm + hail', '⛈️'], 99: ['Thunderstorm + hail', '⛈️'],
};

let hasFetchedOnce = false;

export function initWeather() {
  const elements = {
    location: document.getElementById('weatherLocation'),
    icon: document.getElementById('weatherIcon'),
    temp: document.getElementById('weatherTemp'),
    condition: document.getElementById('weatherCondition'),
    humidity: document.getElementById('weatherHumidity'),
    wind: document.getElementById('weatherWind'),
    feels: document.getElementById('weatherFeels'),
    card: document.getElementById('weatherCard'),
    retryBtn: document.getElementById('retryWeatherBtn'),
  };

  elements.retryBtn.addEventListener('click', () => loadWeather(elements));

  document.addEventListener('feature:opened', (event) => {
    if (event.detail.name === 'weather' && !hasFetchedOnce) {
      hasFetchedOnce = true;
      loadWeather(elements);
    }
  });
}

function loadWeather(elements) {
  setLoading(elements, true);
  elements.retryBtn.hidden = true;

  if (!navigator.geolocation) {
    fetchWeather(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude, DEFAULT_COORDS.label, elements);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude, null, elements);
    },
    () => {
      // Permission denied or unavailable — fall back to a default city
      // instead of leaving the widget blank.
      fetchWeather(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude, DEFAULT_COORDS.label, elements);
    },
    { timeout: 8000 }
  );
}

async function fetchWeather(lat, lon, knownLabel, elements) {
  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`;
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error('Weather request failed');

    const data = await response.json();
    const current = data.current;

    const [conditionText, icon] = WEATHER_CODES[current.weather_code] ?? ['Unknown', '🌡️'];

    elements.icon.textContent = icon;
    elements.temp.textContent = `${Math.round(current.temperature_2m)}°C`;
    elements.condition.textContent = conditionText;
    elements.humidity.textContent = `${current.relative_humidity_2m}%`;
    elements.wind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    elements.feels.textContent = `${Math.round(current.apparent_temperature)}°`;

    elements.location.textContent = knownLabel ?? (await resolveLocationName(lat, lon));
  } catch (error) {
    elements.condition.textContent = "Couldn't load weather right now.";
    elements.location.textContent = 'Unavailable';
    elements.retryBtn.hidden = false;
  } finally {
    setLoading(elements, false);
  }
}

/** Best-effort reverse geocoding; falls back to a generic label on failure. */
async function resolveLocationName(lat, lon) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (!response.ok) throw new Error('Geocode failed');
    const data = await response.json();
    return data.city || data.locality || 'Your location';
  } catch {
    return 'Your location';
  }
}

function setLoading(elements, isLoading) {
  elements.card.classList.toggle('loading', isLoading);
  if (isLoading) {
    elements.condition.textContent = 'Fetching weather…';
    elements.location.textContent = 'Locating…';
  }
}
