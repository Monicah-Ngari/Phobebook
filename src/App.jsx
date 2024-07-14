import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import notesManager from "./services/note"; // Changed import to match the example service pattern

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    notesManager.getAll().then((response) => {
      console.log("promise fulfilled", response.data);
      setPersons(response.data);
    });
  }, []);

  const nameInput = (event) => {
    event.preventDefault();
    if (newName.trim() !== "" && newNumber.trim() !== "") {
      if (persons.some((person) => person.name === newName)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        const newPerson = { name: newName, number: newNumber };
        notesManager.create(newPerson).then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        });
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

  const personsToShow = Array.isArray(persons)
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase().trim())
      )
    : [];

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
