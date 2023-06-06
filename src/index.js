
function formatDate(timestamp){
let date = new Date(timestamp);
let time = date.getHours();
if(time <10){
  time=   `0${time}` ;
}
let minuts = date.getMinutes();
if(minuts<10){
  minuts=`0${minuts}` ;
}

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayname = weekday[date.getDay()];
return `${dayname} ${time}:${minuts}`;
}

function showheathercondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML=response.data.weather[0].description;

  let humidity = response.data.main.humidity;
  document.querySelector("#Humedad").innerHTML = `Humedad: ${humidity} %`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#viento").innerHTML = `Viento: ${wind} km/h`;

  document.querySelector("#date").innerHTML= formatDate(response.data.dt*1000);

  let iconchange = document.querySelector("#icono-principal");
   iconchange.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconchange.setAttribute("alt", response.data.weather[0].description);
}

function findcity(city) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiurl).then(showheathercondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#busqueda");
  findcity(city.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celcius.classList.remove("active");
  fahrenheit.classList.add("active");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#FindButton");
form.addEventListener("click", handleSubmit);

let submitform = document.querySelector("#form-search");
submitform.addEventListener('submit',handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celcius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

findcity("tegucigalpa");

