import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter/Filter'
import PersonForm from './components/PersonForm/PersonForm'
import Persons from './components/Persons/Persons'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} already exists in the phonebook!`);
      setNewName("");
      setNewNumber("");
    } else {
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
    })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h2>Add new contact</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} />
    </div>
  );
};

export default App;