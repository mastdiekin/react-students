const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

const auth = (req, res, next) => {
  // const token = req.header("x-auth-token");
  const token = req.headers.authorization.split(" ")[1];
  //check token
  if (!token)
    res.status(401).send({
      error: true,
      message: "No token, authorization denied",
    });

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //add user from payload
    req.user = decoded;
    console.log(decoded.id);
    User.findById(decoded.id)
      .then((user) => {
        Role.findById(user.role.toString())
          .then((role) => {
            if (!role) {
              return res.status(401).send({
                error: true,
                message: "Wrong role",
              });
            }
            req.userRole = role;
            next();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log("Catch error", req.headers.authorization);
    res.status(400).send({
      error: true,
      message: "This is not valid",
    });
  }
};

module.exports = auth;
