document.getElementById("get-weather").addEventListener(
  "click",
  async function() {
    try {
      const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=3446d1cfd90e485e82d205158240304&q=07112&days=7");
      const data = await response.json();
      console.log(data.forecast);
    } catch (error) {
      console.error(error);
    }
  }
);
