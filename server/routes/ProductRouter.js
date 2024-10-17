const express = require("express");
const router = express.Router();
const Product = require("../modals/product-modal"); // Ensure the path is correc


router.get("/products", async (req, res) => {
  const { category } = req.query;

  try {
    let products;
    if (category) {
      products = await Product.find({ Category: category }).lean(); // Fetch products by category
      console.log(`Found products for category "${category}":`, products); // Log fetched products
    } else {
      products = []; // If no category is provided, return an empty array
    }

    res.json(products); // Return the products
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});


// router.get("/products", async (req, res) => {
//   const { category } = req.query; // Get category from query parameters
//   console.log(category);

//   // try {
//     let products;
//     if (category) {
//       products = await Product.find(
//         { Category: category }
//       );
//       console.log(`Found products:`, products); // Log the fetched products for debugging
//       res.json(products);
//     }
//   //   // Deduplicate products based on _id
//     const uniqueProducts = Array.from(
//       new Set(products.map((product) => product._id.toString()))
//     ).map((id) => products.find((product) => product._id.toString() === id));

//     console.log(`Unique products:`, uniqueProducts); // Log deduplicated products
//     res.json(uniqueProducts); // Return the unique products
//   // } catch (error) {
//   //   console.error("Error fetching products:", error);
//   //   res.status(500).json({ message: "Error fetching products" });
//   // }
// });
router.get("/listing", async (req, res) => {
  try {
    let tab;
    // if (category) {
    //   // Log category for debugging
    tab = await Product.find(
      {},
      {
        Category: 2,
      }
    );

    console.log(tab);

    //   console.log(`Found products:`, products); // Log the fetched products for debugging
    // }
    // else {
    //   products = await Product.find(); // Fetch all products if no category
    // }
    res.json(tab);
    // Deduplicate products based on _id
    // const uniqueProducts = Array.from(
    //   new Set(products.map((product) => product._id.toString()))
    // ).map((id) => products.find((product) => product._id.toString() === id));

    // console.log(`Unique products:`, uniqueProducts); // Log deduplicated products
    // res.json(uniqueProducts); // Return the unique products
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Route to fetch product details by ID
router.get("/products/:id", async (req, res) => {
  const { id } = req.params; // Get the product ID from URL parameters
  try {
    const product = await Product.findById(id); // Fetch the product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product); // Return the product details
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
});

module.exports = router;
