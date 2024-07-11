import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "123-456-7890" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:5173/").then((response) => {
      console.log("promise fulfilled");
      setNewName(response.data);
    });
  }, []);

  const nameInput = (event) => {
    event.preventDefault();
    if (newName.trim() !== "" && newNumber.trim() !== "") {
      if (persons.some((person) => person.name === newName)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        setPersons([...persons, { name: newName, number: newNumber }]);
        setNewName("");
        setNewNumber("");
      }
    }
  };

  const addName = (event) => {
    setNewName(event.target.value);
  };

  const addNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const filterNames = (event) => {
    setFilterName(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase().trim())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} filterNames={filterNames} />
      <h2>Add New</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        addNumber={addNumber}
        nameInput={nameInput}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
