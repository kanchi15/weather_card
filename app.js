//selecting html elements

const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

//app data
const weather = {};

weather.temperature ={
    unit: "celsius"
}

const kelvin= 273;
//API key 
const key = "33ae2787d48b8b4d48ddca5762a254e1";

//check if browser supports geolocation
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display= "block";
    notificationElement.innerHtml = "<p>Browser doesn't support Geolocation</p>"
}

//set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

//for error msg
function showError(){
    notificationElement.style.display= "block";
    notificationElement.innerHtml = "<p>no loction</p>";
}

//get weather from API
function getWeather(latitude, longitude){
    let api= `http://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].main;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country=data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}
function displayWeather(){
    iconElement.innerHTML= `<img src="icons/${weather.iconId}.png">`;
    tempElement.innerHTML= `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML= `${weather.description}`;
    locationElement.innerHTML= `<p>${weather.city},${weather.country}</p>`
}

//C to F conversion
function ctof(temp){
    return (Math.floor((temp* 9/5)+32));
}

//when temperature is clicked
tempElement.addEventListener("click",function(){
    if(weather.temperature.value=== undefined) return ;
    if (weather.temperature.unit=="celsius"){
        let F= ctof(weather.temperature.value);
        tempElement.innerHTML= `${F}°<span>F</span>`;
        weather.temperature.unit="fahrenheit"
    }
    else{
        tempElement.innerHTML= `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit="celsius";
    }
})
