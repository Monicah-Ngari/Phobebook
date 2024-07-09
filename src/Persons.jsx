import React from "react";

const Persons = ({ personsToShow }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>
            {person.name} : {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
