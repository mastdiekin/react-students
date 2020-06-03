const config = require("config");
const jwt = require("jsonwebtoken");

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
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //add user from payload
    req.user = decoded;
    console.log("Decoded", decoded);
    next();
  } catch (e) {
    console.log("Catch error", req.headers.authorization);
    res.status(400).send({
      error: true,
      message: "This is not valid",
    });
  }
};

module.exports = auth;
