const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Category schema and model
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

module.exports = router;