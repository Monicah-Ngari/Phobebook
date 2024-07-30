import axios from "axios";

const baseUrl = "http://localhost:5173/api/notes";

const getAll = () => {
  console.log("Fetching all data from:", baseUrl);
  return axios.get(baseUrl);
};

const create = (newObject) => {
  console.log("Creating new object:", newObject);
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  console.log(`Updating object with id ${id}:`, newObject);
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id) => {
  console.log(`Deleting object with id ${id}`);
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
