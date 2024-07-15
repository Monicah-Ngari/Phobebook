import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import notesManager from "./services/note";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    notesManager
      .getAll()
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setPersons(response.data);
        } else {
          console.error("Unexpected response format: ", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const nameInput = (event) => {
    event.preventDefault();
    if (newName.trim() !== "" && newNumber.trim() !== "") {
      if (persons.some((person) => person.name === newName)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        const newPerson = { name: newName, number: newNumber };
        notesManager
          .create(newPerson)
          .then((response) => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error adding person: ", error);
          });
      }
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      notesManager
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => console.error("Error deleting contact:", error));
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
