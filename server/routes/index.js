const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/users");
/* GET home page. */
router.post("/api/register", function(req, res, next) {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "something went wrong" });
  } else if (password) {
    console.log(name, email, password);
    let newUser = new User({ name, email, password });
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      const res = await newUser.save();
      console.log(res);
    });

    res.json(newUser);
  } else {
    let user = new User({ name, email, password });

    res.json(newUser);
  }
  // res.json({ msg: "something went wrong" }).status(400);
  // res.status(403).send("Sorry! You can't see that.");
  // res.statusMessage = "Current password does not match";
  // res.status(400).end();
});

router.post("/api/login", async (req, res, next) => {
  const data1 = passport.authenticate("local", {
    successRedirect: "http://localhost:8080/",
    failureRedirect: "http://localhost:8080/login"
  })(req, res, next);
  console.log(data1);
  let data = req.body;
  console.log(data);
  // res.json(data);
});

module.exports = router;
