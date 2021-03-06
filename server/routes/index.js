const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { secretKey } = require("../config/jwt");

/* GET home page. */
router.post("/api/register", async function(req, res, next) {
  let { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    res.status(409).send({ auth: false, msg: "user with email exists" });
  } else if (!user) {
    let newUser = new User({ name, email, password });
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      let response = await newUser.save();
    });
    let token = await jwt.sign(
      { id: newUser.id, userName: newUser.name, email: newUser.email },
      secretKey,
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );
    res.status(200).send({ auth: true, token: token });
  } else {
    res.status(500).send({ error: "Error on the server" });
  }
});

router.post("/api/login", async (req, res, next) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ error: "User not found" });
    } else {
      let passwordIsValid = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });
      let token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
    // res.status(200).send({ data: user });
  } catch {
    res.status(500).send({ error: "Error on the server" });
  }
});

module.exports = router;
