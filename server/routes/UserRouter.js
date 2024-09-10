const express = require("express");
const router = express.Router();
const User = require("../modals/user-modal");
const { v4: uuidv4 } = require('uuid');

// Create a new user
router.post("/create", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const userId = uuidv4(); // Generate a unique userId
    const newUser = new User({
      userId,  // Set the generated userId
      ...req.body // Spread the rest of the request body
    });
    await newUser.save();
    console.log("User saved:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(400).json({ error: error.message });
  }
});


// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a user by userId
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by userId
router.post("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by userId
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userId: req.params.userId });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Check if the phone number exists
// Check if the phone number exists
router.get("/check-phone/:uPhone", async (req, res) => {
  try {
    const { uPhone } = req.params; // Extract the phone number from URL parameters
    console.log("Checking phone number:", uPhone); // Log the phone number
    
    const user = await User.findOne({ "uProfile.uPhone": uPhone }); // Query the database for the phone number
    console.log("Found user:", user); // Log the result
    
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;


