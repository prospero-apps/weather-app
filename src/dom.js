import SearchIcon from './icons/magnify.png';
import FeelsLikeIcon from './icons/thermometer-lines.png';
import WindSpeedIcon from './icons/weather-windy.png';
import RainChanceIcon from './icons/weather-rainy.png';
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
export const dayPanel = add(container, 'day-panel');
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

/* TEMPERATURE PANEL */
export const description = add(temperaturePanel, 'description');
export const weatherImage = add(temperaturePanel, 'weather-icon');
export const temperature = add(temperaturePanel, 'temperature');
const scale = add(temperaturePanel, 'scale');
export const scaleF = add(scale, 'scaleF', 'button');
scaleF.textContent = '°F';
export const scaleC = add(scale, 'scaleC', 'button');
scaleC.textContent = '°C';
export const gif = add(temperaturePanel, 'gif');

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

const rainChance = add(statsPanel, 'rain-chance');
export const rainChanceImage = add(rainChance, 'rain-chance-icon');
const rainChanceIcon = new Image();
rainChanceIcon.src = RainChanceIcon;
rainChanceImage.appendChild(rainChanceIcon);
const rainChanceLabel = add(rainChance, 'rain-chance-label');
rainChanceLabel.textContent = 'Chance of Rain';
export const rainChanceValue = add(rainChance, 'rain-chance-value');

const humidity = add(statsPanel, 'humidity');
export const humidityImage = add(humidity, 'humidity-icon');
const humidityIcon = new Image();
humidityIcon.src = HumidityIcon;
humidityImage.appendChild(humidityIcon);
const humidityLabel = add(humidity, 'humidity-label');
humidityLabel.textContent = 'Humidity';
export const humidityValue = add(humidity, 'humidity-value');

/* DAY PANEL */

/* WEEK PANEL */
