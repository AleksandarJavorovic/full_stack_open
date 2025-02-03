import { useState, useEffect } from 'react'
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
  const [notificationMessage, setNotificationMessage] = useState({ message: null, type: null });

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
          showNotification(`${newName}'s number has been updated!`, 'success');
          setNewName("");
          setNewNumber("");
        })
        .catch(() => {
          showNotification(`Information of ${newName} has already been removed from server!`, 'error');
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
      setNewName("");
      setNewNumber("");
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        showNotification(`Added ${newName}!`, 'success');
        setNewName("");
        setNewNumber("");
    })
    }
  };

  const showNotification = (message, type) => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage({ message: null, type: null });
    }, 5000);
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
      <Notification message={notificationMessage.message} type={notificationMessage.type} />
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