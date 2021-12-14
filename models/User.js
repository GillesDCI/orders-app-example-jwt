const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  createdOn: { type: Date, required: true, default: Date.now },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // hash of password
  password: {
    type: String,
    required: true,
  },
  roles: [String],
});

const User = model("User", userSchema);

module.exports = User;
