const mongoose = require("mongoose");

const cartScehma = mongoose.Schema(
  {
    userId: { type: String, required: [true, "userId is required"] },
    prodId: { type: String, required: [true, "prodId is required"] },
    pName: { type: String, required: [true, "pName is required"] },
    pDescription: { type: String },
    pRating: { type: Number, required: [true, "pRating is required"] },
    pCategory: { type: String, required: [true, "pCategory is required"] },
    quantity: { type: Number, required: [true, "quantity is required"] },
    price: { type: Number, required: [true, "price is required"] },
    pDiscount: { type: Number, required: [true, "price is required"] },
    pShippingCharges: {
      type: Number,
      required: [true, "Shipping Charges is required"],
    },
    color: { type: String, required: [true, "color is required"] },
    image: { type: String, required: [true, "image is required"] },
  },
  { collection: "Cart", timestamps: true }
);

module.exports = mongoose.model("cart", cartScehma);
