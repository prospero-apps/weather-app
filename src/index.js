import './style.css';

import {
  city,
  todayDate,
  todayTime,
  searchInput,
  searchImage,
  description,
  weatherImage,
  temperature,
  scaleF,
  scaleC,
  gif,
  feelsLikeValue,
  windSpeedValue,
  pressureValue,
  humidityValue,
  temperaturePanel,
  statsPanel,
  weekPanel,
} from './dom';

// helper functions
function addItem(where, cls, tag = 'div') {
  const element = document.createElement(tag);
  element.className = cls;
  return where.appendChild(element);
}

function formatDate(timezone) {
  const localTime = new Date();
  const timeOffset = localTime.getTimezoneOffset() * 60 + timezone;
  localTime.setSeconds(localTime.getSeconds() + timeOffset);

  const dayName = localTime.toLocaleString('default', { weekday: 'long' });
  const month = localTime.toLocaleString('default', { month: 'long' });
  const day = localTime.getDate();
  const year = localTime.getFullYear();

  const date = `${dayName}, ${month} ${day}, ${year}`;
  const time = `${localTime.getHours()}:${localTime.getMinutes().toString().padStart(2, '0')}`;

  return { date, time };
}

function toCelsius(temp) {
  return Math.round(temp - 273.15);
}

function toFahrenheit(temp) {
  return Math.round(toCelsius(temp) * 1.8 + 32);
}

// initialization
const weatherIcon = new Image();
let days = [];

// LOAD GIF
async function getGif(location) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=W7cKIBKFMbbAP5dAAkviacBwQNLWQZR6&s=${location}`,
    { mode: 'cors' },
  )
    .then((response) => response.json())
    .then((response) => {
      gif.src = response.data.images.original.url;
    });
}

// LOAD WEATHER DATA
async function getData(location) {
  try {
    // CURRENT WEATHER
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=48f6a27fca74b448539664c245fa0a54`,
      { mode: 'cors' },
    );
    const data = await response.json();
    const icon = await fetch(
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      { mode: 'cors' },
    );

    // location panel
    city.textContent = data.name;
    const localTime = formatDate(data.timezone);
    todayDate.textContent = localTime.date;
    todayTime.textContent = localTime.time;

    // temperature panel
    description.textContent = data.weather[0].description;
    weatherIcon.src = icon.url;
    weatherImage.appendChild(weatherIcon);
    temperature.textContent = `${toCelsius(data.main.temp)}°C`;

    // stats panel
    feelsLikeValue.textContent = `${toCelsius(data.main.feels_like)}°C`;
    windSpeedValue.textContent = `${data.wind.speed} km/h`;
    pressureValue.textContent = `${data.main.pressure} hPa`;
    humidityValue.textContent = `${data.main.humidity}%`;

    // 5-DAY FORECAST
    const forecast = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=48f6a27fca74b448539664c245fa0a54`,
      { mode: 'cors' },
    );

    const forecastData = await forecast.json();
    const firstItem = forecastData.list.find((element) => element.dt_txt.substring(11, 13) === '12');
    const firstItemIndex = forecastData.list.indexOf(firstItem);

    days = [
      forecastData.list[firstItemIndex],
      forecastData.list[firstItemIndex + 8],
      forecastData.list[firstItemIndex + 16],
      forecastData.list[firstItemIndex + 24],
      forecastData.list[firstItemIndex + 32],
    ];

    // week panel
    days.forEach(async (d) => {
      const dayContainer = addItem(weekPanel, 'day-container');
      const day = addItem(dayContainer, 'day');
      day.textContent = d.dt_txt;
      const dayTemperature = addItem(dayContainer, 'day-temperature');
      dayTemperature.textContent = `${toCelsius(d.main.temp)}°C`;
      dayTemperature.dataset.temp = d.main.temp;
      const dayDescription = addItem(dayContainer, 'day-description');
      dayDescription.textContent = d.weather[0].description;

      const wIcon = await fetch(
        `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`,
        { mode: 'cors' },
      );

      const dayIcon = new Image();
      dayIcon.className = 'day-icon';
      dayIcon.src = wIcon.url;
      dayContainer.appendChild(dayIcon);
    });

    // event listeners
    const dayTemperatures = document.querySelectorAll('.day-temperature');

    scaleF.addEventListener('click', () => {
      temperature.textContent = `${toFahrenheit(data.main.temp)}°F`;
      feelsLikeValue.textContent = `${toFahrenheit(data.main.feels_like)}°F`;

      dayTemperatures.forEach((t) => {
        t.textContent = `${toFahrenheit(t.dataset.temp)}°F`;
      });

      scaleF.className = 'clicked';
      scaleC.classList.remove('clicked');
    });

    scaleC.addEventListener('click', () => {
      temperature.textContent = `${toCelsius(data.main.temp)}°C`;
      feelsLikeValue.textContent = `${toCelsius(data.main.feels_like)}°C`;

      dayTemperatures.forEach((t) => {
        t.textContent = `${toCelsius(t.dataset.temp)}°C`;
      });

      scaleC.className = 'clicked';
      scaleF.classList.remove('clicked');
    });

    // make panels visible after error
    if (temperaturePanel.style.visibility === 'hidden') {
      temperaturePanel.style.visibility = 'visible';
    }

    if (statsPanel.style.visibility === 'hidden') {
      statsPanel.style.visibility = 'visible';
    }

    if (weekPanel.style.visibility === 'hidden') {
      weekPanel.style.visibility = 'visible';
    }

    if (gif.style.visibility === 'hidden') {
      gif.style.visibility = 'visible';
    }
  } catch (err) {
    city.textContent = '';
    todayDate.textContent = 'Location not found.';
    todayTime.textContent = 'Try again.';
    searchInput.value = '';
    gif.style.visibility = 'hidden';
    temperaturePanel.style.visibility = 'hidden';
    statsPanel.style.visibility = 'hidden';
    weekPanel.style.visibility = 'hidden';
  }
}

searchImage.addEventListener('click', () => {
  if (searchInput.value !== '') {
    weekPanel.replaceChildren();
    getGif(searchInput.value);
    getData(searchInput.value);
  }
});

getGif('New York');
getData('New York');
