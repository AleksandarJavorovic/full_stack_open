import OnePerson from '../OnePerson/OnePerson';

const Persons = ({ persons, searchName }) => {
    const displayedPersons = searchName
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : persons;
    return (
      <div>
        {displayedPersons.map((person) => (
          <OnePerson key={person.name} person={person} />
        ))}
      </div>
    );
  };

export default Persons;