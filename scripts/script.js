"use strict";

async function getWeatherData(city) {                                                              
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d3693b5cf226414a938180630240401&q=${city}&days=3`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    let data = await response.json();
    displayCurrentWeather(data);
    displayForecastWeather(data.forecast.forecastday);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayCurrentWeather(data){
  if(data){
  let date = new Date(data.current.last_updated.replace(" ", "T"));
  
    document.getElementById("currentWeather").innerHTML = `
    <div class="card-head">
        <span class="day">${days[date.getDay()]}</span>
        <span class="date">${date.getDate() + months[date.getMonth()]}</span>                
    </div>
    <div class="card-body">
      <span class="city">${data.location.name}</span>
      <div class="temp">
        <span class="temp_c">${data.current.temp_c}<sup>o</sup>C</span>
        <img src="https:${data.current.condition.icon}" class="condition-icon" aria-hidden="true">
      </div>
      <span class="condition-text">${data.current.condition.text}</span>
      <div class="wind">
        <div class="humidity-box"><img src="images/icon-umberella.png" aria-hidden="true"><span class="humidity">${data.current.humidity}%</span></div>
        <div class="wind_kph-box"><img src="images/icon-wind.png" aria-hidden="true"><span class="wind_kph">${data.current.wind_kph}km/h</span></div>
        <div class="wind_dir-box"><img src="images/icon-compass.png" aria-hidden="true"><span class="wind_dir">${data.current.wind_dir}</span></div>
      </div>
    </div>
    `
  }
}

function displayForecastWeather(data){
  if (data){
    let dataForecast = data.slice(1,);
    let dataForecastContent = [];
    dataForecast.forEach(day => {
      let date = new Date(day.date.replace(" ", "T"));
      dataForecastContent.push(
        `<div class="card-head">
        <span class="day">${days[date.getDay()]}</span>             
        </div>
        <div class="card-body">
        <img src="https:${day.day.condition.icon}" class="condition-icon" aria-hidden="true">
        <div class="temp">
        <span class="maxtemp_c">${day.day.maxtemp_c}<sup>o</sup>C</span>
        <span class="mintemp_c">${day.day.mintemp_c}<sup>o</sup>C</span>                  
        </div>
        <span class="condition-text">${day.day.condition.text}</span>
        </div>`
      )
    })
document.getElementById("day1Forecast").innerHTML = dataForecastContent[0];
document.getElementById("day2Forecast").innerHTML = dataForecastContent[1];
  }
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

const searchInput = document.getElementById("searchInput")
const submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", () => {
  getWeatherData(searchInput.value);
});


async function getIPData() {                                                              
  try {
    let response = await fetch(`https://ipapi.co/json/`);
    if (!response.ok) {
      getWeatherData("cairo");
      throw new Error("Network response was not OK");
    }
    let data = await response.json();
    getWeatherData(data.city);
    displayIPInfo(data);
  } catch (error) {
    getWeatherData("cairo");
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayIPInfo(data){
  if(data){
    document.getElementById("ipInfo").innerHTML = `
      <div class="card-head text-center">
      <span class="fs-5">Your IP Information</span>              
      </div>
      <div class="card-body d-flex flex-column align-items-start row-gap-2">                
      <span>Country: ${data.country_name}</span>
      <span>City: ${data.city}</span>
      <span>IPv4: ${data.ip}</span>
      <span>ISP: ${data.org}</span>
      </div>
    `
  }
}

getIPData();