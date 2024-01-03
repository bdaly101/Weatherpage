var cities = [3,11,19,27,35];

var searchCity = "";

var cityInput = ""; 

var startBtn = $("#startBtn");
var searchBox = $('input[type="text"]');
var listBtn = $("#listBtn");
var cityList = $('.cityList');

var fiveBox = $('.fiveDayBox');
var cityTitle = $('.selCityName');
var currTemp = $('.currTemp');
var currWind = $('.currWind');
var currHumidity = $('.currHumid');
var cityName = '';
var currIcon = $('.currIcon');

var dayOne = $('.dayOne');
var dayTwo = $('.dayTwo');
var dayThree = $('.dayThree');
var dayFour = $('.dayFour');
var dayFive = $('.dayFive');

var nameList = [];



var apiKey = "71e8b6f80de35d7a61233841e77c15d4";

async function getLocation() {
    var lat;
    var lon;
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
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

async function currentWeather() {
    let location = await getLocation();
    //get current weather
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=imperial`;
    fetch(requestUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        cityTitle.text(cityName);
        currIcon.attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        currTemp.text('Temp: ' + data.main.temp + 'Fº');
        currWind.text('Wind: ' + data.wind.speed + 'MPH');
        currHumidity.text('Humidity: ' + data.main.humidity + '%');

        //console.log(data.list[0].main.temp);
      });
      requestUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=imperial`;
      fetch(requestUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //console.log(data.list);
          var index = 3;
          for (var i = 0; i < 5; i ++) {
            var day = $(`#${i}`);
            //console.log(day.children(".date"));
            var onDay = data.list[index];
            //console.log(onDay.weather[0].icon);
            day.children("#date").text(onDay.dt_txt);
            day.children("#weatherIcon").attr("src", `http://openweathermap.org/img/wn/${onDay.weather[0].icon}.png`);
            day.children("#temp").text('Temp: ' + onDay.main.temp + 'ºF');
            day.children("#wind").text('Wind: ' + onDay.wind.speed + 'MPH');
            day.children("#humidity").text('Humidity: ' + onDay.main.humidity + '%');
            index += 8;
          }
        });
};



//var cityList = $('.cityList');

function search(event) {
    cityName = searchBox.val();
    if (cityName != "") {
      currentWeather();
    searchBox.val("");
    //console.log(cityName);
    var newCity = $(`<button class="button cityList" id="${cityName}">`).text(cityName);
    //console.log(newCity)
    cityList.append(newCity);
    //console.log(cityList[0]);
    nameList.push(cityName);
    console.log(nameList);
    localStorage.setItem("cityNameList", JSON.stringify(nameList));
    //var thing = JSON.parse(localStorage.getItem("cityNameList"));
    //console.log(thing);
    }
    
}

//console.log($('#listBtn'));
cityList.on('click', '.cityList', function() {
  //console.log(this.textContent);
  cityName = this.textContent;
  console.log(cityName);
  currentWeather();
})



function loadPage() {
  savedCities = localStorage.getItem("cityNameList");
  if (savedCities != null) {
    console.log(savedCities);
    loadCities = JSON.parse(savedCities);
    for (var i = 0; i < loadCities.length; i++) {
      var loadName = loadCities[i];
      var newCity = $(`<button class="button cityList" id="${loadName}">`).text(loadName);
      //console.log(newCity)
      cityList.append(newCity);
    }
  }
}
//localStorage.clear();
console.log(nameList);
loadPage();
//console.log(cityList);
startBtn.on('click',search);