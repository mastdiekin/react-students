const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
const db = "mongodb://localhost/students";

const app = express();

//middleware
app.use(bp.json());

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
