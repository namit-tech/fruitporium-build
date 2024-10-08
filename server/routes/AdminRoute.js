// routes/admin.js
const express = require('express');
const router = express.Router();
const protect = require('../middlewares/Auth');

// Protected route only for admins
router.get('/dashboard', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;

