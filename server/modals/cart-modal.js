const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userId is required"],
  },
  prodId: {
    type: String,
    required: [true, "prodId is required"],
  },
  name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  description: {
    type: String,
  },
  origin: {
    type: String, 
    required: [true, "Product Origin is required"],
  },
  category: {
    type: String,
    required: [true, "Product Category is required"],
  },
  season: {
    type: String,
    required: [true, "Season is required"],
  },
  by_size:{
    type: String,
    required: [true, "size is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  pDiscount: {
    type: Number,
    required: [true, "Discount is required"],
  },
  pShippingCharges: {
    type: Number,
    required: [true, "Shipping Charges are required"],
  },
  : {
    type: String,
    required: [true, "Color is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});



module.exports = mongoose.model("Product", productSchema);
