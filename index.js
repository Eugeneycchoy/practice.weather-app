// Personal api key from Open Weather API
const apiKey = "b83f317e1477c365ff9be2b63f14043a";

// Api url to request data
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Store user input
const userInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-logo");
const date = new Date();
const hour = date.getHours().toString().padStart(2, 0);
const minutes = date.getMinutes().toString().padStart(2, 0);
const currentTime = `${hour}:${minutes}`;
const dayOfWeek = convertToDay(date.getDay());

function convertToDay(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

function displayWeatherIcon(weather) {
  switch (weather) {
    case "Clear":
      return "images/clear.png";
    case "Clouds":
      return "images/clouds.png";
    case "Drizzle":
      return "images/drizzle.png";
    case "Rain":
      return "images/rain.png";
    case "Mist":
      return "images/mist.png";
    case "Snow":
      return "images/snow.png";
    default:
      return "images/clear.png";
  }
}

function greetTheUser(hour) {
  if (hour < 12) {
    return "GOOD MORNING";
  } else {
    return "GOOD EVENING";
  }
}

// Retrive and update the weather data according to a given city input by the user
async function updateWeather(city) {
  // fetch weather data from Open Weather API
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  // turn the data retrived into JSON format and store them in the data object
  let data = await response.json();

  // Display city name
  document.querySelector("h1").innerHTML = data.name;
  // Display day
  document.querySelector(".date-and-time .day").innerHTML = dayOfWeek;
  // Display time

  document.querySelector(".date-and-time .time").innerHTML = currentTime;
  // Display different weather icons based on the current weather
  document.querySelector("body > div > div.weather-logo > img").src =
    displayWeatherIcon(data.weather[0].main);
  // Display temperature
  document.querySelector("h2").innerHTML = Math.floor(data.main.temp) + "°C";
  // Display greetings according to current time
  document.querySelector(".greetings p").innerHTML = greetTheUser(hour);
  // Display wind speed
  document.querySelector(
    "body > div > div.detailed-infos > div.wind-speed > p:nth-child(3)"
  ).innerHTML = Math.floor(data.wind.speed) * 3.6 + " km/h";
  // Display humidity
  document.querySelector(
    "body > div > div.detailed-infos > div.humidity > p:nth-child(3)"
  ).innerHTML = data.main.humidity + " %";
}

// Add an event listener to the search button
searchBtn.addEventListener("click", () => {
  updateWeather(userInput.value);
  event.preventDefault(); // Prevent form submission
  userInput.value = "";
});
