// Function to fetch weather details by alpha3Code
function fetchWeatherDetails(alpha3Code) {
  const apiKey = 'c9fc4ea01be5d53c126bbf9a7eb98647'; 
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`;

  return fetch(weatherAPIUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      return {
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
      };
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      return null;
    });
}

// Function to create a card for a country
function createCountryCard(countryData) {
  const div = document.createElement('div');
  div.setAttribute('class', 'col-lg-4 col-md-4 cards');
  div.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title name">${countryData.name.toUpperCase()}</h2>
        <img src="${countryData.flag}" class="card-img-top img" alt="country img">
        <p class="card-title capital">Capital: ${countryData.capital}</p>
        <p class="card-title">Region: ${countryData.region}</p>
        <p class="card-title">Country Code: ${countryData.alpha3Code}</p>
        <p class="card-title">LatIng: ${countryData.latlng}</p>
        <button type="button" class="btn btn-primary btn-weather">Click for Weather</button>
        
      </div>
    </div>
  `;

  // Add a click event listener to the "Click for Weather" button
  const weatherButton = div.querySelector('.btn-weather');
  weatherButton.addEventListener('click', () => {
    fetchWeatherDetails(countryData.alpha3Code)
      .then((weatherData) => {
        if (weatherData) {
          const weatherInfoElement = document.createElement('p');
          weatherInfoElement.textContent = `Temperature: ${weatherData.temperature}°C, Weather: ${weatherData.description}`;
          div.appendChild(weatherInfoElement);
        }
      });
  });

  return div;
}

// Fetch countries and create cards
var res = fetch('https://restcountries.com/v2/all');
res
  .then((data) => data.json())
  .then((countries) => {
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    document.body.append(container);

    let row;
    countries.forEach((country, index) => {
      if (index % 3 === 0) {
        row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.append(row);
      }

      const countryCard = createCountryCard(country);
      row.appendChild(countryCard);
    });
  })
  .catch((error) => {
    console.error('Error fetching country data:', error);
  });
