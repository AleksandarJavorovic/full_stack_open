const PersonForm = ({
    addPerson,
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
  }) => {
    return (
      <div>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <br />
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <br />
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    );
  };

export default PersonForm;