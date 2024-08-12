const Filter = ({ searchName, setSearchName }) => {
    return (
      <div>
        search contact:{" "}
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
    );
  };

export default Filter;