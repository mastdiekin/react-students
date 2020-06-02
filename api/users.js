const express = require("express");
const api = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// //GET Users
// api.get("/", auth, (req, res) => {
//   User.find()
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).render(err));
// });

// //GET User by ID
// api.get("/:id", auth, (req, res) => {
//   const id = req.params.id;
//   User.findOne({ id: id })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).json(err));
// });

//POST Register user
api.post("/register", (req, res) => {
  if (req.body.data) {
    req.body = req.body.data;
  }
  const {
    // login,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return res.send({
      error: true,
      message: "All fields required!",
    });
  }

  // if (!login) {
  //   let login = undefined;
  // }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.send({
          error: true,
          message: "This email already exists!",
        });
      }

      const newUser = new User({
        // login,
        email,
        password,
      });

      //create salt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
          if (err) throw err;
          newUser.password = hashedPassword;
          return newUser
            .save()
            .then((user) => {
              jwt.sign(
                { id: user._id },
                config.get("jwtSecret"),
                {
                  expiresIn: 604800,
                },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user._id,
                      // login: user.login,
                      email: user.email,
                    },
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});

//POST Login user
api.post("/login", (req, res) => {
  if (req.body.data) {
    req.body = req.body.data;
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({
      error: true,
      message: "All fields required!",
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.send({
          error: true,
          message: "This email does not exists!",
        });
      }

      //validate password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.send({
              error: true,
              message: "Invalid credentials",
            });
          }

          jwt.sign(
            { id: user._id },
            config.get("jwtSecret"),
            {
              expiresIn: 604800,
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user._id,
                  login: user.login,
                  email: user.email,
                },
              });
            }
          );
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//GET user data
api.post("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      res.send(user);
    });
});

module.exports = api;