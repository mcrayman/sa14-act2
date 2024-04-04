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
    const date = new Date(data.location.localtime);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('time').textContent = day;
    const time = date.toLocaleTimeString('en-US', { timeStyle: 'short' });
    document.getElementById('time').textContent += ' ' + time;
    document.getElementById('temperature').textContent = data.current.temp_f + '°F';
    document.getElementById('weather-description').src = '../' + data.current.condition.icon.replace('//cdn.weatherapi.com/', '');
    document.getElementById('humidity').textContent = 'Humidity: ' + data.current.humidity + '%';

    // Update HTML elements with the received data for the next 5 days
    const forecast = data.forecast.forecastday;
    for (let i = 0; i < forecast.length; i++) {
      const day = forecast[i];
      const dayElement = document.getElementById(`day-${i}`);
      const date = new Date(day.date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const month = date.toLocaleDateString('en-US', { month: 'long' });
      const dayOfMonth = date.toLocaleDateString('en-US', { day: 'numeric' });
      dayElement.querySelector('.date').textContent = `${dayOfWeek}, ${month} ${dayOfMonth}`;
      dayElement.querySelector('.max-temp').textContent = 'High ' + day.day.maxtemp_f + '°F';
      dayElement.querySelector('.low-temp').textContent = 'Low ' + day.day.mintemp_f + '°F';
      dayElement.querySelector('#weather-description').src = '../' + day.day.condition.icon.replace('//cdn.weatherapi.com/', '');
    }
    
  } catch (error) {
    console.error(error);
    alert('Failed to fetch weather data. Please check the console for more information.');
  }
}

getWeather('Memphis');