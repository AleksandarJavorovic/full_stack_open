import { useState, useEffect } from 'react'
import counteriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    counteriesService
      .getAll()
      .then(countries => setCountries(countries))
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const countryDetails = (country) => {
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
      </div>
    )
  }

  const renderResults = () => {
    if (!searchQuery) {
      return null
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (filteredCountries.length === 1) {
      return countryDetails(filteredCountries[0])
    }

    return filteredCountries.map(country => (
      <p key={country.name.common}>{country.name.common}</p>
    ))
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
