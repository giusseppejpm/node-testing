const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async(req, res) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  res.status(200).send(data);
});
app.post("/", async(req, res) => {
  const body = req.body;
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    body
  );
  res.status(201).send(data);
});
app.put("/:id", async(req, res) => {
  const body = req.body;
  const id = req.params.id;
  await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
  res.sendStatus(204);
});
app.delete("/:id", async(req, res) => {
  const id = req.params.id;
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  res.sendStatus(204);
});
app.listen(3000, () => {
  console.log("escuchando puerto 3000");
});