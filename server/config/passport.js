const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
// load user model
const User = require("../models/users");
module.exports = function() {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //Match user
        User.findOne({ email: email })
          .then(async user => {
            if (!user) {
              return done(null, false, { msg: "that email is not registered" });
            }
            console.log("user from passport.js", user);

            //   match password
            try {
              let res = await bcrypt.compare(password, user.password);
              console.log(res);
            } catch (err) {
              console.log(`password is incorrect`);
            }
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
