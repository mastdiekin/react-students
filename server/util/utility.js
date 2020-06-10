const chalk = require("chalk");
require("better-logging")(console, {
  color: {
    type: {
      info: chalk.bgGreen.black,
    },
  },
});

module.exports = {
  colenv: () => {
    return console.info(
      "Current environment",
      process.env.NODE_ENV === "production"
        ? chalk.white.bgGreen(" " + process.env.NODE_ENV + " ")
        : chalk.black.bgRed(" " + process.env.NODE_ENV + " ")
    );
  },
  coldb: (db) => {
    return console.log("Using", chalk.white.bgGreen(" " + db + " "));
  },
  db: () =>
    process.env.NODE_ENV === "production"
      ? `mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_PASSWORD}@students-hfnmg.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
      : "mongodb://localhost/students",
};
