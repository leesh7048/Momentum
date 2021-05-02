const weather = document.querySelector(".weather");
const api_key = "498ab03960a4d10f784982fc9dcd2adc";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${Math.floor(temperature)}˚C @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem("coords", JSON.stringify(coordsObj));
}

//좌표를 가져오는데 성공했을떄 처리하는 함수
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
//좌표를 가져오는데 실패했을떄 처리하는 함수
function handleGeoError() {
  console.log("cant access geo location");
}
//위치 좌표를 가져오는 함수
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem("coords");
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
