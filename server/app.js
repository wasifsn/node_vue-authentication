var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();
var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);
const mongoose = require("mongoose");

//db config

const db = require("./config/keys").MongoUri;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo DB CONNECTED");
  })
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "production" || process.env) {
  require("dotenv").config();
  // static folder
  app.use(express.static(BASE_PATH + "/public"));
  // SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const port = process.env.port || 4000;
const ip = process.env.ip || "localhost";
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

app.listen(port, ip, () => {
  process.stdout.write(`server port is started on ${port}`);
});
