document.getElementById('weather-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('city-input').value;
  getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3446d1cfd90e485e82d205158240304&q=${city}&days=5&aqi=no&alerts=no`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Update HTML elements with the received data for current weather
    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('city-region').textContent = data.location.region;
    document.getElementById('city-country').textContent = data.location.country;
    document.getElementById('time').textContent = data.location.localtime;
    document.getElementById('temperature').textContent = data.current.temp_f + '°F';
    document.getElementById('weather-description').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = 'Humidity: ' + data.current.humidity + '%';

    // Update HTML elements with the received data for the next 5 days
    const forecast = data.forecast.forecastday;
    for (let i = 0; i < forecast.length; i++) {
      const day = forecast[i];
      const dayElement = document.getElementById(`day-${i}`);
      dayElement.querySelector('.date').textContent = day.date;
      dayElement.querySelector('.max-temp').textContent = 'High ' + day.day.maxtemp_f + '°F';
      dayElement.querySelector('.low-temp').textContent = 'Low ' + day.day.mintemp_f + '°F';
      dayElement.querySelector('.weather-description').textContent = day.day.condition.text;
    }
    
  } catch (error) {
    console.error(error);
    alert('Failed to fetch weather data. Please check the console for more information.');
  }
}

getWeather('Memphis');