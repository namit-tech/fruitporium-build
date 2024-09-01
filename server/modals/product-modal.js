const mongoose = require("mongoose");

const productScehma = mongoose.Schema(
  {
    _id: { type: String, required: [true, "_id is required"] },
    image: Buffer,
    name: String,
    type: String,
    countryOrigin: String,
    benefits: String,
    ingrediants: String,
    unit: Number,
    FssaiLicense: Number,
    shelfLife: Number,
    customercare: String,
    return: String,
    description: String,
    byUnit: {
      bySize: { type: String },
      byPrice: { type: Number },
      byDiscount: { type: Number },
    },
  },
  { collection: "Products", timestamps: true }
);

module.exports = mongoose.model("products", productScehma);
