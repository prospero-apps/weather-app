// helper functions
function createPanel(id) {
  const panel = document.createElement('div');
  panel.id = id;
  return panel;
}

const content = document.getElementById('content');
const container = content.appendChild(createPanel('container'));
const temperaturePanel = container.appendChild(createPanel('temperature-panel'));
const locationPanel = container.appendChild(createPanel('location-panel'));
const statsPanel = container.appendChild(createPanel('stats-panel'));
const navPanel = container.appendChild(createPanel('nav-panel'));
const weekPanel = container.appendChild(createPanel('week-panel'));
const hourPanel = container.appendChild(createPanel('hour-panel'));

export {
  content,
  container,
  temperaturePanel,
  locationPanel,
  statsPanel,
  navPanel,
  weekPanel,
  hourPanel,
};
