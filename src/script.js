function displayNow() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Staurday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${hour}:${minute}`;
}

function displayCityData(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let todayIcon = document.querySelector("#today-icon");

  todayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  console.log(response.data);
}

function search(city) {
  let apiKey = "44c8ae2ea57987a781d7fe9181c8c0cd";
  let units = "metric";
  let urlEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${urlEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityData);
}

function findCityData(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function searchPosition(position) {
  let apiKey = "44c8ae2ea57987a781d7fe9181c8c0cd";
  let units = "metric";
  let urlEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${urlEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  document.querySelector("#temp").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
}

displayNow();
search("Hong Kong");

let celsiusTemperature = null;

let searchCity = document.querySelector("form.search-bar");
searchCity.addEventListener("submit", findCityData);

let searchLocation = document.querySelector("#current-location");
searchLocation.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);
