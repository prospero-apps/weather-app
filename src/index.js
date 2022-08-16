import './style.css';

import {
  city,
  todayDate,
  todayTime,
  description,
  weatherImage,
  temperature,
  gif,
  feelsLikeValue,
  windSpeedValue,
  pressureValue,
  humidityValue,
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
  const time = `${localTime.getHours()}:${localTime.getMinutes()}`;

  return { date, time };
}

function celsiusToFahrenheit(celsius) {
  return Math.round(celsius * 1.8 + 32);
}

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
  // CURRENT WEATHER
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=48f6a27fca74b448539664c245fa0a54`,
    { mode: 'cors' },
  );
  const data = await response.json();
  const icon = await fetch(
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    { mode: 'cors' },
  );

  // location panel
  city.textContent = data.name;
  const localTime = formatDate(data.timezone);
  todayDate.textContent = localTime.date;
  todayTime.textContent = localTime.time;

  // temperature panel
  description.textContent = data.weather[0].description;
  const weatherIcon = new Image();
  weatherIcon.src = icon.url;
  weatherImage.appendChild(weatherIcon);
  const celsiusTemperature = Math.round(data.main.temp - 273.15);
  temperature.textContent = `${celsiusTemperature}°C`;

  // stats panel
  feelsLikeValue.textContent = `${Math.round(data.main.feels_like - 273.15)}°C`;
  windSpeedValue.textContent = `${data.wind.speed} km/h`;
  pressureValue.textContent = `${data.main.pressure} hPa`;
  humidityValue.textContent = `${data.main.humidity}%`;

  // 5-DAY FORECAST
  const forecast = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=48f6a27fca74b448539664c245fa0a54`,
    { mode: 'cors' },
  );

  const forecastData = await forecast.json();
  const days = [
    forecastData.list[4],
    forecastData.list[12],
    forecastData.list[20],
    forecastData.list[28],
    forecastData.list[36],
  ];

  // console.log(data);
  console.log(forecastData);

  // week panel
  for (let i = 0; i < 5; i++) {
    const dayContainer = addItem(weekPanel, 'week-container');
    const day = addItem(dayContainer, 'day');
    day.textContent = days[i].dt_txt;
    const dayTemperature = addItem(dayContainer, 'day-temperature');
    dayTemperature.textContent = `${Math.round(days[i].main.temp - 273.15)}°C`;
    const dayDescription = addItem(dayContainer, 'day-description');
    dayDescription.textContent = days[i].weather[0].description;

    const icon = await fetch(
      `http://openweathermap.org/img/wn/${days[i].weather[0].icon}@2x.png`,
      { mode: 'cors' },
    );

    const dayIcon = new Image();
    dayIcon.className = 'day-icon';
    dayIcon.src = icon.url;
    dayContainer.appendChild(dayIcon);
  }
}

getGif('New York');
getData('New York');
