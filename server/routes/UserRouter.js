const express = require("express");
const router = express.Router();
const User = require("../modals/user-modal"); // Make sure the path to your User model is correct

// Create a new user
router.post('/create', async (req, res) => {
  console.log("Received data:", req.body);  // Check request data structure

  const { uCredentials, uProfile, uAddress } = req.body;

  // Ensure email is present
  if (!uCredentials || !uCredentials.uEmail) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    const user = new User({
      uCredentials,
      uProfile,
      uAddress,
    });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).send({ error: err.message });
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

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.post("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

