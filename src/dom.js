import SearchIcon from './icons/magnify.png';
import FeelsLikeIcon from './icons/thermometer-lines.png';
import WindSpeedIcon from './icons/weather-windy.png';
import PressureIcon from './icons/gauge.png';
import HumidityIcon from './icons/water-percent.png';

// helper functions
function add(where, id, tag = 'div') {
  const element = document.createElement(tag);
  element.id = id;
  return where.appendChild(element);
}

const content = document.getElementById('content');

/* MAIN CONTAINER */
const container = add(content, 'container');
const locationPanel = add(container, 'location-panel');
const temperaturePanel = add(container, 'temperature-panel');
const statsPanel = add(container, 'stats-panel');
export const weekPanel = add(container, 'week-panel');

/* LOCATION PANEL */
export const city = add(locationPanel, 'city');
export const todayDate = add(locationPanel, 'today-date');
export const todayTime = add(locationPanel, 'today-time');
const searchPanel = add(locationPanel, 'search-panel');
export const searchInput = add(searchPanel, 'search-input', 'input');
searchInput.placeholder = 'New York';
export const searchImage = add(searchPanel, 'search-icon');
const searchIcon = new Image();
searchIcon.src = SearchIcon;
searchImage.appendChild(searchIcon);
export const gif = add(locationPanel, 'gif', 'img');

/* TEMPERATURE PANEL */
const descriptionPanel = add(temperaturePanel, 'description-panel');
export const description = add(descriptionPanel, 'description');
export const weatherImage = add(descriptionPanel, 'weather-icon');
export const temperature = add(temperaturePanel, 'temperature');
const scale = add(temperaturePanel, 'scale');
export const scaleF = add(scale, 'scaleF', 'button');
scaleF.textContent = '°F';
export const scaleC = add(scale, 'scaleC', 'button');
scaleC.textContent = '°C';
scaleC.className = 'clicked';

/* STATS PANEL */
const feelsLike = add(statsPanel, 'feels-like');
export const feelsLikeImage = add(feelsLike, 'feels-like-icon');
const feelsLikeIcon = new Image();
feelsLikeIcon.src = FeelsLikeIcon;
feelsLikeImage.appendChild(feelsLikeIcon);
const feelsLikeLabel = add(feelsLike, 'feels-like-label');
feelsLikeLabel.textContent = 'Feels Like';
export const feelsLikeValue = add(feelsLike, 'feels-like-value');

const windSpeed = add(statsPanel, 'wind-speed');
export const windSpeedImage = add(windSpeed, 'wind-speed-icon');
const windSpeedIcon = new Image();
windSpeedIcon.src = WindSpeedIcon;
windSpeedImage.appendChild(windSpeedIcon);
const windSpeedLabel = add(windSpeed, 'wind-speed-label');
windSpeedLabel.textContent = 'Wind Speed';
export const windSpeedValue = add(windSpeed, 'wind-speed-value');

const pressure = add(statsPanel, 'pressure');
export const pressureImage = add(pressure, 'pressure-icon');
const pressureIcon = new Image();
pressureIcon.src = PressureIcon;
pressureImage.appendChild(pressureIcon);
const pressureLabel = add(pressure, 'pressure-label');
pressureLabel.textContent = 'Pressure';
export const pressureValue = add(pressure, 'pressure-value');

const humidity = add(statsPanel, 'humidity');
export const humidityImage = add(humidity, 'humidity-icon');
const humidityIcon = new Image();
humidityIcon.src = HumidityIcon;
humidityImage.appendChild(humidityIcon);
const humidityLabel = add(humidity, 'humidity-label');
humidityLabel.textContent = 'Humidity';
export const humidityValue = add(humidity, 'humidity-value');
