const express = require("express");
const axios = require("axios");
const { users } = require("./endpoints");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersHandlers = users({ axios });

app.get("/", usersHandlers.get);
app.post("/", usersHandlers.post);
app.put("/:id", usersHandlers.put);
app.delete("/:id", usersHandlers.delete);
app.listen(3000, () => {
  console.log("escuchando puerto 3000");
});