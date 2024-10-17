const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sno: { type: Number, required: true },
    name: { type: String, required: true },
    Category: { type: [String], required: true }, // Array of category strings
    description: { type: String, required: true },
    origin: { type: String, required: true },
    season: { type: String },
    by_size: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true },
        pDiscount: { type: Number, required: true },
      },
    ],
    prices_per_unit: { type: String },
    shelf_life: { type: String },
    cold_storage: { type: String },
    nutrient_value: { type: String },
    storage_and_uses: { type: String },
    proxy_images_uploaded: { type: String },
    photoshoot_done: { type: String },
  },
  { collection: "Products", timestamps: true }
);

module.exports = mongoose.model("products", productSchema);

