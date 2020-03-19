const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();

//require router files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);
const mongoose = require("mongoose");

//db config
const db = require("./config/keys").MongoUri;

//connect to DB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to DB: test`);
  })
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();

  // static folder, optional setup: if you want to deploy the app
  // uncomment below line to use assets from - Vue build

  // app.use(express.static(BASE_PATH + "/public"));

  // SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// use router middleware
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
  process.stdout.write(`Server is listening on ${port}`);
});
