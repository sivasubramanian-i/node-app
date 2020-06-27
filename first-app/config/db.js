var mongoose = require("mongoose");
var _ = require("lodash");
var config = require("./config");

mongoose.connect(config.mongo.MONGO_PATH, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
mongoose.set("debug", config.mongo.MONGO_DEBUG);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db Connected ---->>>>>>>>");
});

module.exports = _.extend(
  {
    mongoose
  },
  db
);
