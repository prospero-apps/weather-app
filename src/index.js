import './style.css';
import CloudyIcon from './icons/clouds.png';
// import FoggyIcon from './icons/weather-fog.png';
// import HailyIcon from './icons/weather-hail.png';
// import StormyIcon from './icons/weather-lighning.png';
// import OvercastIcon from './icons/weather-partly-cloudy.png';
// import RainyIcon from './icons/weather-pouring.png';
// import SnowyIcon from './icons/weather-snowy-heavy.png';
// import SunnyIcon from './icons/weather-sunny.png';
// import WindyIcon from './icons/weather-dust.png';

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

// location panel
// city.textContent = 'New York';
// todayDate.textContent = 'Monday, August 15, 2022';
// todayTime.textContent = '7:47 pm';

// temperature panel
// description.textContent = 'Light Rain';
// const weatherIcon = new Image();
// weatherIcon.src = CloudyIcon;
// weatherImage.appendChild(weatherIcon);
// temperature.textContent = '24°C';

// stats panel
// feelsLikeValue.textContent = '22°C';
// windSpeedValue.textContent = '28.6 km/h';
// rainChanceValue.textContent = '0.6%';
// humidityValue.textContent = '84%';

// week panel
for (let i = 0; i < 7; i++) {
  const dayContainer = addItem(weekPanel, 'week-container');
  const day = addItem(dayContainer, 'day');
  day.textContent = 'Thursday';
  const dayTemperature = addItem(dayContainer, 'day-temperature');
  dayTemperature.textContent = '19°C';
  const dayIcon = new Image();
  dayIcon.className = 'day-icon';
  dayIcon.src = CloudyIcon;
  dayContainer.appendChild(dayIcon);
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

// getGif('New York');

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

async function getData(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=48f6a27fca74b448539664c245fa0a54`,
    { mode: 'cors' },
  );
  const data = await response.json();
  const icon = await fetch(
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    { mode: 'cors' },
  );

  const forecast = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=48f6a27fca74b448539664c245fa0a54`,
    { mode: 'cors' },
  );

  const forecastData = await forecast.json();

  console.log(data);
  console.log(forecastData);

  // feed data
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
}

getData('New York');

/// API KEY maps
// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=48f6a27fca74b448539664c245fa0a54
// 48f6a27fca74b448539664c245fa0a54

/// API KEY giphy
// `https://api.giphy.com/v1/gifs/translate?api_key=W7cKIBKFMbbAP5dAAkviacBwQNLWQZR6&s=london`
