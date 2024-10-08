const express = require('express');
const router = express.Router();
const Admin = require('../modals/owner-modal'); // Ensure the correct path
const jwt = require('jsonwebtoken');

// Admin registration route
router.post('/admin/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create a new admin with hashed password
    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin login route
router.post('/admin/login', async (req, res) => {
  console.log('Login route hit');
  const { username, password } = req.body;

  console.log('Request body:', req.body);

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin not found');
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    console.log('Login successful, token:', token);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
