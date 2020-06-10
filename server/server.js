const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/api");
const path = require("path");
const Role = require("./models/Role");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const _u = require("./util/utility");
// const graphQL = require("express-graphql");

//nodemon.json
// {
//   "env": {
//     "NODE_ENV": "developement",
//     "MONGO_ADMIN": "loginname",
//     "MONGO_PASSWORD": "password",
//     "MONGO_DBNAME": "dbname",
//     "JWT_SECRET": "jwt secret phrase"
//   }
// }

_u.colenv();
//db
const db = _u.db();
_u.coldb(db);

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/uploads", express.static("uploads"));
app.use(helmet());
// app.use(
//   "/graphql",
//   graphQL({
//     schema: require("./graphql/schema"),
//     rootValue: require("./graphql/resolvers"),
//   })
// );

//db
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  // .then(() => {
  //   Role.findOne({ type: "administrator" }).then((role) => {
  //     if (!role) {
  //       const role = new Role({
  //         type: "administrator",
  //         caps: {
  //           canEdit: true,
  //           canAdd: true,
  //           canDelete: true,
  //         },
  //       });
  //       role.save();
  //     }
  //   });
  // })
  .catch((err) => console.error(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

app.use((req, res, next) => {
  Role.findOne({ type: "user" })
    .then((role) => {
      req.role = role;
      next();
    })
    .catch((err) => console.error(err));
  // User.findById("5ed16833e7fc0f59639d9ac9")
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server listen on ${port} port`)
);

const io = require("./socket").init(server);
io.on("connection", (socket) => {
  console.log("Socket client connected.", "id: " + socket.id);
});
