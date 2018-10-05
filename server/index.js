require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const port = 3443;
const controller = require("./controller");
const app = express();
const massive = require("massive");

app.use(body_parser.json());

console.log(controller.read);
massive(process.env.CONNECTION_STRING)
  .then(db => {
    // console.log(db);
    app.set("db", db);
  })
  .catch(err => console.log(err));

app.get("/api/houses", controller.read);

app.post("/api/create", controller.create);

app.delete("/api/house/:id", controller.deleteID);

app.listen(port, () => {
  console.log(`Docked at port: ${port}`);
});