const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    uCredentials: {
      uEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
    },
    uProfile: {
      uName: { type: String },
      uPhone: { type: Number },
    },
    uAddress: {
      uZipCode: { type: Number },
      uHouseNumber: { type: String },
      uArea: { type: String },
      uCity: { type: String },
    },
  },
  { collection: "Users", timestamps: true }
);


module.exports = mongoose.model("user", userSchema);
