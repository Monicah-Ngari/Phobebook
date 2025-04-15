import React from "react";

const PersonForm = ({ newName, newNumber, addName, addNumber, nameInput }) => (
  <form onSubmit={nameInput} className="add-form">
    <div>
      name: <input value={newName} onChange={addName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={addNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
