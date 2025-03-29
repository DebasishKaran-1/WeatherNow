const apiKey = "8ce7a3a44f7b572608e7515e66320e51";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            errorDiv.style.display = "block";
            return;
        }

        const data = await response.json();
        errorDiv.style.display = "none";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        const weatherCode = data.weather[0].icon;
        weatherIcon.src = `images/${getWeatherIcon(weatherCode)}`;
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorDiv.style.display = "block";
    }
}

function getWeatherIcon(weatherCode) {
    const iconMap = {
        "01d": "clear.png",
        "01n": "clear.png",
        "02d": "clouds.png",
        "02n": "clouds.png",
        "03d": "drizzle.png",
        "03n": "drizzle.png",
        "04d": "drizzle.png",
        "04n": "drizzle.png",
        "09d": "rain.png",
        "09n": "rain.png",
        "10d": "rain.png",
        "10n": "rain.png",
        "11d": "rain.png",
        "11n": "rain.png",
        "13d": "snow.png",
        "13n": "snow.png",
        "50d": "mist.png",
        "50n": "mist.png"
    };
    
    return iconMap[weatherCode] || "clear.png";
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

checkWeather("Bengaluru");
