const apiKey = "135b4680f495e1a1ca73bef01fc0628e";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
const tempType = "imperial"; // metric = C, imperial = F
let city = "";
const button = document.querySelector("#button");
const weatherCondition = document.querySelector(".weather-icon");

async function weatherAPI() {
    const response = await fetch(apiURL + `q=${city}&appid=${apiKey}&units=${tempType}`);
    var data = await response.json();

    console.log(response.status);

    var status = response.status;

    if (status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".error").style.display = "none";
    }

    if (response.status != 200) {
        document.querySelector(".temp").innerHTML = ''
        document.querySelector(".city").innerHTML = ''
        document.querySelector(".humidity").innerHTML = '';
        document.querySelector(".wind").innerHTML = '';
        weatherCondition.src = '';

    }
    var weather = data.weather[0].main;

    // console.log(data);

    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°F`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".wind").innerHTML = `${Math.round(data.wind.speed)} km/h`;
    
    getWeatherIcon(weather);
    // console.log(weather);

    document.querySelector(".weather").style.display = "block";
}

button.addEventListener("click", function() {
    city = document.querySelector("#input").value
    document.querySelector("#humidityText").innerHTML = 'Humidity';
    weatherAPI()
});

function getWeatherIcon(weatherIcon) {
    let iconPath = '';

    switch(weatherIcon) {
        case 'Haze':
            iconPath = "images/haze.png";
            break;
        case 'Clouds':
            iconPath = "images/clouds.png";
            break;
        case 'Rain':
            iconPath = "images/rain.png";
            break;
        case 'Clear':
            iconPath = "images/clear.png";
            break;
        case 'Drizzle':
            iconPath = "images/drizzle.png";
            break;
        case 'Mist':
            iconPath = "images/mist.png";
            break;
        case 'Snow':
            iconPath = "images/snow.png";
            break;
        default:
            iconPath = "N/A";
            break;
    }

    weatherCondition.src = iconPath
}

// weather options: Clouds, Clear, Rain, Drizzle, Mist