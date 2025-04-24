import express from "express";
// const express = require("express");
const app = express();
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/", (_, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.get("/api/persons", (_, res) => {
  res.json(persons);
});
app.get("/info", (_, res) => {
  const numberOfEntries = persons.length;
  const currentTime = new Date();
  res.send(
    `<p>Phonebook has info for ${numberOfEntries} people</p>
    <p>Request received at: ${currentTime}</p>`
  );
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: `Person with id ${id} not found` });
  }
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
