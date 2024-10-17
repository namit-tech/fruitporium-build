const express = require("express");
const router = express.Router();
const Product = require("../modals/product-modal"); // Ensure the path is correc
// router.get("/products", async (req, res) => {
//   const { category } = req.query; // Get category from query parameters

//   try {
//     let products;
//     if (category) {
//       // Modify the query to search for the category in any of the objects in the Category array
//       products = await Product.find({
//         $or: [
//           { "Category.categoryOne": category },
//           { "Category.categoryTwo": category }
//         ]
//       });
//     } else {
//       products = await Product.find(); // Fetch all products if no category
//     }

//     res.json(products); // Return the products
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Error fetching products" });
//   }
// });

router.get("/products", async (req, res) => {
  const { Category } = req.query; // Get category from query parameters

  try {
    let products;
    if (Category) {
      // Log category for debugging
      console.log(
        `Fetching products for category: ${Category},${typeof Category}`
      );
      products = await Product.find(
        // $or: [
        { Category: Category, Name: "Washington Apple" }
        // ]
      );
      console.log("***");

      console.log(`Found products:`, products); // Log the fetched products for debugging
    } else {
      products = await Product.find(); // Fetch all products if no category
    }

    // Deduplicate products based on _id
    const uniqueProducts = Array.from(
      new Set(products.map((product) => product._id.toString()))
    ).map((id) => products.find((product) => product._id.toString() === id));

    console.log(`Unique products:`, uniqueProducts); // Log deduplicated products
    res.json(uniqueProducts); // Return the unique products
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
