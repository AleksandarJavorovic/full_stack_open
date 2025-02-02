import { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter/Filter'
import PersonForm from './components/PersonForm/PersonForm'
import Persons from './components/Persons/Persons'
import personService from './services/persons'
import Notification from './components/Notification/Notification'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      if(window.confirm(`${newName} already exists in the phonebook! Replace the old number with a new one?`)) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map((person) => (person.id !== returnedPerson.id ? person : returnedPerson)));
          setErrorMessage(
            `${newName}'s number has been updated!`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName("");
          setNewNumber("");
        })
      }
      setNewName("");
      setNewNumber("");
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setErrorMessage(
          `Added ${newName}!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Persons persons={persons} searchName={searchName} deletePerson={deletePerson} />
    </div>
  );
};

export default App;