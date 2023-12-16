var cities = [];

var searchCity = "";

var cityInput = ""; 

var startBtn = $("#startBtn");
var searchBox = $('input[type="text"]');

var cityList = $('.cityList');

var fiveBox = $('fiveDayBox');
var cityTitle = $('.selCityName');
var currTemp = $('.currTemp');
var currWind = $('.currWind');
var currHumidity = $('.currHumid');
var cityName = '';
//var lat = 40.981613;
//var lon = -73.691925;
function updateCity() {
    if (searchCity) {
        cityTitle.text(searchCity);
    }
}







var apiKey = "71e8b6f80de35d7a61233841e77c15d4";

async function getLocation() {
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
    await fetch(requestUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            lat = data[0].lat;
            lon = data[0].lon
        });
        return {
            lat,
            lon
        }
};

async function newFunc() {
    let location = await getLocation();
    console.log(location.lat);
};


async function currentWeather() {
    let location = await getLocation();
    //get current weather
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=imperial`;
    fetch(requestUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cityTitle.text(cityName);
        currTemp.text('Temp: ' + data.main.temp + 'Fº');
        currWind.text('Wind: ' + data.wind.speed + 'MPH');
        currHumidity.text('Humidity: ' + data.main.humidity + '%');
        //console.log(data.list[0].main.temp);
      });
};







async function fiveDayWeather() {
    //await getLocation();
    var requestUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(requestUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.list);
        //console.log(data.list[0].main.temp);
      });
};

var cityList = $('.cityList');

function search(event) {
    cityName = searchBox.val();
    
    currentWeather();
    searchBox.val("");
    console.log(cityName);
    var newCity = $('<p>').text(cityName);
    cityList.append(newCity);
}

startBtn.on('click',search);