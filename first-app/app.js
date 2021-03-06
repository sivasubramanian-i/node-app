var createError = require("http-errors");
var express = require("express");
var fs = require("fs");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const indexRoutes = require("./routes/index.route");
var config = require("./config/config");
var mongoose = require("./config/db");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// log only 4xx and 5xx responses to console
if (config.logger) {
  app.use(
    logger("dev", {
      skip: function(req, res) {
        return res.statusCode < 400;
      }
    })
  );

  // log all requests to access.log
  app.use(
    logger("common", {
      stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
        flags: "a"
      })
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
