// Your API key from WeatherAPI 
const API_KEY = 'YOUR_API_KEY_HERE';
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// Grab all the HTML elements we need to update
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const weatherDisplay = document.getElementById('weatherDisplay');

const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// ===== EVENT LISTENERS =====
// These listen for user actions and trigger the right function

// When the user clicks "Search"
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

// When the user presses Enter in the search box
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

// When the user clicks the location button
locationBtn.addEventListener('click', getWeatherByLocation);

// When the popup first opens, load a default city
window.addEventListener('load', () => {
    getWeatherByCity('London');
});

// ===== MAIN API FUNCTION =====
// This is where the magic happens — fetching weather from the API

async function getWeatherByCity(city) {
    showLoading(); // Show the spinner

    try {
        // 1. Build the API URL
        //    - key = your API key (proves you're allowed)
        //    - q = the city you want weather for
        const url = `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&aqi=no&days=3`;

        // 2. Call the API — fetch() sends the request and waits for a response
        const response = await fetch(url);

        // 3. Check if the request worked (e.g. city exists)
        if (!response.ok) {
            throw new Error('City not found');
        }

        // 4. Parse the response — converts the raw data into a JS object
        const data = await response.json();

        // 5. Hand the data to our display function
        displayWeather(data);

    } catch (err) {
        // If anything above fails, we end up here
        showError('Could not find that city. Try another one!');
    }
}

// ===== GEOLOCATION =====
// Gets the user's coordinates, then calls the API with those

function getWeatherByLocation() {
    showLoading();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    // Same as above, but instead of a city name
                    // we pass in the lat and lon coordinates
                    const url = `${API_BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`;
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error('Location not found');
                    }

                    const data = await response.json();
                    displayWeather(data);

                } catch (err) {
                    showError('Could not get weather for your location.');
                }
            },
            () => {
                showError('Location access denied. Try searching a city instead.');
            }
        );
    } else {
        showError('Your browser does not support geolocation.');
    }
}

// ===== DISPLAY WEATHER =====
// Takes the API data and puts it into the HTML

function displayWeather(data) {
    // The API returns data like this:
    // data.location.name = "London"
    // data.current.temp_c = 12
    // data.current.condition.text = "Partly cloudy"
    // So we just plug each piece into the right place

    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temp.textContent = Math.round(data.current.temp_c);
    condition.textContent = data.current.condition.text;
    feelsLike.textContent = Math.round(data.current.feelslike_c);
    humidity.textContent = data.current.humidity;
    wind.textContent = data.current.wind_kph;

    // Apply the right animation based on the weather
    applyWeatherAnimation(data.current.condition.text, data.current.is_day);

   // Swap loading for the weather display
    hideLoading();
    hideError();
    weatherDisplay.classList.remove('hidden');

    // Display the 3-day forecast
    displayForecast(data.forecast.forecastday);
}

// ===== FORECAST =====
// Takes the forecast array and fills in the 3 cards

function displayForecast(forecastDays) {
    const forecastSection = document.getElementById('forecastSection');
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    forecastDays.forEach((day, index) => {
        const card = document.getElementById(`forecast${index}`);

        // Get the day name from the date the API gives us
        const date = new Date(day.date + 'T12:00:00');
        const dayName = dayNames[date.getDay()];

        // Pick an emoji based on the weather condition
        const icon = getWeatherEmoji(day.day.condition.text);

        // Fill in the card
        card.querySelector('.forecast-day').textContent = dayName;
        card.querySelector('.forecast-icon').textContent = icon;
        card.querySelector('.forecast-high').textContent = Math.round(day.day.maxtemp_c) + '°';
        card.querySelector('.forecast-low').textContent = Math.round(day.day.mintemp_c) + '°';
    });

    // Show the forecast section
    forecastSection.classList.remove('hidden');
}

// ===== WEATHER EMOJI =====
// Matches the condition text to a cute emoji

function getWeatherEmoji(conditionText) {
    const c = conditionText.toLowerCase();

    if (c.includes('sunny') || c.includes('clear')) return '☀️';
    if (c.includes('partly cloudy')) return '⛅';
    if (c.includes('cloud') || c.includes('overcast')) return '☁️';
    if (c.includes('light rain') || c.includes('drizzle')) return '🌦️';
    if (c.includes('rain') || c.includes('shower')) return '🌧️';
    if (c.includes('thunder') || c.includes('storm')) return '⛈️';
    if (c.includes('snow') || c.includes('sleet')) return '❄️';
    if (c.includes('fog') || c.includes('mist')) return '🌫️';
    if (c.includes('ice')) return '🧊';

    return '🌤️'; // default
}

// ===== WEATHER ANIMATIONS =====
// Checks what the weather is and adds the matching CSS class

function applyWeatherAnimation(conditionText, isDay) {
    // Reset — remove any previous weather class
    weatherDisplay.className = 'weather-display';

    const c = conditionText.toLowerCase();

    if (c.includes('sunny') || c.includes('clear')) {
        weatherDisplay.classList.add(isDay ? 'sunny' : 'night');
    } else if (c.includes('rain') || c.includes('drizzle')) {
        weatherDisplay.classList.add('rainy');
    } else if (c.includes('cloud') || c.includes('overcast')) {
        weatherDisplay.classList.add('cloudy');
    } else if (c.includes('snow') || c.includes('ice') || c.includes('sleet')) {
        weatherDisplay.classList.add('snowy');
    } else if (c.includes('mist') || c.includes('fog')) {
        weatherDisplay.classList.add('cloudy');
    } else {
        weatherDisplay.classList.add(isDay ? 'cloudy' : 'night');
    }
}

// ===== UI HELPER FUNCTIONS =====
// These just show/hide the right sections

function showLoading() {
    loading.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    error.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    loading.classList.add('hidden');
}

function hideError() {
    error.classList.add('hidden');
}