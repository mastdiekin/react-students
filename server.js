const express = require("express");
const mongoose = require("mongoose");
const studentsApi = require("./api/students");
const usersApi = require("./api/users");
const cors = require("cors");
const path = require("path");
const config = require("config");

// need add config file in /config/default.json
// {
//   "mongoURI": "YOUR_CONNECT_TO_DATABASE",
//   "jwtSecret": "YOUR_SECRET"
// }

//db
const db = config.get("mongoURI");

const app = express();

//middleware
app.use(express.json());

app.use(cors());
app.use("/api/students", studentsApi);
app.use("/api/users", usersApi);

//db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen on ${port} port`));
