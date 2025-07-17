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
    const accept = req.headers.accept || '';
    if (accept.includes('text/html')) {
      res.send(`
        <html>
          <head>
            <title>All Categories</title>
            <style>
              body { background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%); font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 0; }
              .container { max-width: 500px; margin: 3rem auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2.5rem 2rem; }
              h1 { color: #38a169; text-align: center; }
              .welcome { text-align: center; color: #e53e3e; font-size: 1.1em; margin-bottom: 2rem; }
              ul { list-style: none; padding: 0; }
              li { margin-bottom: 1rem; padding: 0.75rem; border-radius: 8px; background: #f7fafc; box-shadow: 0 2px 8px rgba(0,0,0,0.04); text-align: center; }
              .name { color: #38a169; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>All Categories</h1>
              <div class="welcome">Welcome, Shacni!</div>
              <ul>
                ${categories.map(cat => `
                  <li><span class="name">${cat.name}</span></li>
                `).join('')}
              </ul>
            </div>
          </body>
        </html>
      `);
    } else {
      res.json(categories);
    }
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