const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sno: { type: Number, required: true }, // Sno. in the JSON
    name: { type: String, required: true }, // Name of the product
    category: { type: [String], required: true }, // Array of categories
    description: { type: String, required: true }, // Description of the product
    origin: { type: String, required: true }, // Origin of the product
    season: { type: String }, // Season availability
    by_size: [
      {
        size: { type: String, required: true }, // Size of the product
        price: { type: Number, required: true }, // Original price
        pDiscount: { type: Number, required: true }, // Discounted price
      },
    ],
    prices_per_unit: { type: String }, // Prices (approx) / Units field
    shelf_life: { type: String }, // Shelf Life field
    cold_storage: { type: String }, // Cold storage requirement
    nutrient_value: { type: String }, // Nutrient Value & Health Benefits
    storage_and_uses: { type: String }, // Storage and Uses
    proxy_images_uploaded: { type: String }, // Image URL or fallback
    photoshoot_done: { type: String }, // Store image URLs as a string
  },
  { collection: "Products", timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
