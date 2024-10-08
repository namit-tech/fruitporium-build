const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Method to compare entered password with stored password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving admin
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
