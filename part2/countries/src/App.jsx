import { useState, useEffect } from 'react'
import counteriesService from './services/countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )


  const fetchWeather = async (city) => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    try {
      const response = await axios.get(weatherUrl)
      return response.data
    } 
    catch (error) {
      console.error('Error fetching weather data:', error)
      return null
    }
  }  


  useEffect(() => {
    counteriesService
      .getAll()
      .then(countries => setCountries(countries))
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      fetchWeather(selectedCountry.capital[0])
        .then(weatherData => setWeather(weatherData))
        .catch(error => console.error('Error setting weather data:', error))
    }
  }, [selectedCountry])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    } else if (filteredCountries.length === 0) {
      setSelectedCountry(null);
      setWeather(null);
    }
  }, [filteredCountries]);
  
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null);
  }
  

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
    setWeather(null)
  }
  

  const countryDetails = (country) => {
    if (!country) return null;
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Country in {country.subregion}.</p>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{width: '250px'}} />
        <h2>Weather in {country.capital[0]}</h2>
        {weather ? (
          <>
            <p>Temperature: {weather.main.temp}°C</p>
            <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            style={{ width: '100px', height: '100px' }}
          />
            <p>({weather.weather[0].description})</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
  }
  

  const renderResults = () => {
    if (!searchQuery) {
      return null;
    }
  
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  
    if (selectedCountry) {
      return countryDetails(selectedCountry);
    }
  
    if (filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <button onClick={() => handleShowCountry(country)}>show</button>
            </div>
          ))}
        </div>
      );
    }
  
    if (filteredCountries.length === 1) {
      return countryDetails(filteredCountries[0]);
    }
  
    return null;
  }
  
  

  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find countries:{' '}
        <input
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {renderResults()}
      </div>
    </div>
  )
}

export default App
