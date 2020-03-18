const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  email: { type: String, required: true }, // String is shorthand for {type: String}
  password: { type: String, required: true }, // String is shorthand for {type: String}
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
