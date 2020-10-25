const express = require("express");
const axios = require("axios");
const { users, posts } = require("./endpoints");
const bodyParser = require("body-parser");
const { authenticate } = require("./middlewares");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const postsHandlers = posts({ axios });
/**primer argumento ruta, segundo (opt) middlewares, tercero el callback */
app.post("/", authenticate, postsHandlers.post);

// const usersHandlers = users({ axios });
// app.get("/", usersHandlers.get);
// app.post("/", usersHandlers.post);
// app.put("/:id", usersHandlers.put);
// app.delete("/:id", usersHandlers.delete);

app.listen(3000, () => {
  console.log("escuchando puerto 3000");
});

module.exports = app;