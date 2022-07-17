const weatherApi = "https://api.openweathermap.org";
const apiKey = "c44e2b78183ad8b27e02c95710f82236";

var citySearchForm = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#cityInput");
var cityNameEl = document.querySelector("#cityName");
var searchBtnEl = document.querySelector("#searchBtn");
var tempEl = document.querySelector("#temp").innerHTML;

function getWeatherData(location) {

	console.log(location);

	let { lat } = location;
	let { lon } = location;
	let city = location.city;
	console.log(city);
	// /forecast?q=Melbourne&appid=c44e2b78183ad8b27e02c95710f82236&units=metric
	// const requestUrl = `${weatherApi}/data/2.5/forecast?q=${cityInputEl}&appid=${apiKey}&units=metric`;
	const requestUrl = `${weatherApi}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

	fetch(requestUrl)
		.then(function (response) {
			return response.json();
		})
        .then(function (data) {
            
// Tempreture
            for (index = 0; index <5; index++) {
                var temp = (data.list[index].main.temp);
                console.log(temp);   
                // document.getElementById('day' + (i + 1) + 'min').innerHTML = 'min'
            }
// Wind speed
            for (index = 0; index <5; index++) {
                var wind = (data.list[index].wind.speed);
                console.log(wind);             
            }
// Humidity
            for (index = 0; index <5; index++) {
                var humidity = (data.list[index].main.humidity);
                console.log(humidity);             
            }
// Weather icons
            for (index = 0; index <5; index++) {
                var icon = (data.list[index].weather[0].icon);
                console.log(icon);        
                
                // document.getElementById(`'img' + (index + 1)).src = 'http://openweathermap.org/img/wn/'${icon}`)
            }

            // let tempretures = temp
            //    document.querySelector('#temp').innerHTML = temp
                

				// temp = text.replace(data.list[index].main.temp);
				// tempEl.appendChild(temp);
	

			// renderWeatherItems(city, data); <- function render current weather and render forecast
			console.log(data);
		})
		.catch(function (error) {
			console.error(error);
		});
}
function fetchCoordinates(search) {
	const requestUrl = `${weatherApi}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
	fetch(requestUrl)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			console.log(data);
			getWeatherData(data[0]);
		})
		.catch(function (err) {
			console.error(err);
		});
}
// searchBtnEl.addEventListener("click", fetchCoordinates);

// function getInfo() {
//     const newName = document.getElementById('cityInput');
//     const cityName = document.getElementById('cityName');
//     cityName.innerHTML = '--' + newName.value + '--'
// }

//     fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=c44e2b78183ad8b27e02c95710f82236')
//         .then(response => response.json())
//         .then(data => {
//             for (index = 0; index < 5; index++) {
//                document.getElementById('day' + (i + 1) + 'min').innerHTML = 'min' + Number(data.list[i].main.temp_min - 298.08).toFixed(1) + "°";
//             }
//             console.log(data)
//             for (index = 0; index < 5; index++) {
//                 document.getElementById('day' + (i + 1) + 'max').innerHTML = 'max' + Number(data.list[i].main.temp_max - 298.78).toFixed(1) + "°";
//             }
//             for (index = 0; index < 5; index++) {
//                 document.getElementById('img' + (i + 1)).src = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png'
//             }
//         })

//         .catch(err => alert('This is not a vaild City Name!'));

// ment.getElementById('cityInput').defaultValue = 'Melbourne';

function citySearchFormSubmitted(event) {
	if (!cityInputEl.value) {
		return;
	}

	event.preventDefault();
	let search = cityInputEl.value.trim();
	fetchCoordinates(search);
	cityInputEl.value = "";
}
citySearchForm.addEventListener("submit", citySearchFormSubmitted);
