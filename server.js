const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
const api = require("./api");
const cors = require("cors");

const db = "mongodb://localhost/students";

const app = express();

//middleware
app.use(bp.urlencoded({ extended: false }));

app.use(cors());
app.use(api);

//db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen on ${port} port`));
