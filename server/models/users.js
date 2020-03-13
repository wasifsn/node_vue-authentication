const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  title: { type: String, required: true }, // String is shorthand for {type: String}
  email: { type: String, required: true }, // String is shorthand for {type: String}
  password: { type: String, required: true }, // String is shorthand for {type: String}
  date: { type: date, CreatedAt: Date.now }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
