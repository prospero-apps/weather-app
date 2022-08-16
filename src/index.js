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
  rainChanceValue,
  humidityValue,
  dayPanel,
  weekPanel,
} from './dom';

// helper functions
function addItem(where, cls, tag = 'div') {
  const element = document.createElement(tag);
  element.className = cls;
  return where.appendChild(element);
}

// location panel
city.textContent = 'New York';
todayDate.textContent = 'Monday, August 15th, 2022';
todayTime.textContent = '7:47 pm';

// temperature panel
description.textContent = 'Light Rain';
const weatherIcon = new Image();
weatherIcon.src = CloudyIcon;
weatherImage.appendChild(weatherIcon);
temperature.textContent = '24°C';
gif.textContent = 'GIF';

// stats panel
feelsLikeValue.textContent = '22°C';
windSpeedValue.textContent = '28.6 km/h';
rainChanceValue.textContent = '0.6%';
humidityValue.textContent = '84%';

// day panel
for (let i = 0; i < 24; i++) {
  const hourContainer = addItem(dayPanel, 'hour-container');
  const hour = addItem(hourContainer, 'hour');
  hour.textContent = '9 pm';
  const hourTemperature = addItem(hourContainer, 'hour-temperature');
  hourTemperature.textContent = '20°C';
  const hourIcon = new Image();
  hourIcon.className = 'hour-icon';
  hourIcon.src = CloudyIcon;
  hourContainer.appendChild(hourIcon);
}

// week panel
for (let i = 0; i < 8; i++) {
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
