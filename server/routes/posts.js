const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Post schema and model
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('category');
    const accept = req.headers.accept || '';
    if (accept.includes('text/html')) {
      // Render a neat HTML page if accessed from a browser
      res.send(`
        <html>
          <head>
            <title>All Blog Posts</title>
            <style>
              body { background: linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%); font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 0; }
              .container { max-width: 700px; margin: 3rem auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2.5rem 2rem; }
              h1 { color: #3182ce; text-align: center; }
              .welcome { text-align: center; color: #e53e3e; font-size: 1.1em; margin-bottom: 2rem; }
              ul { list-style: none; padding: 0; }
              li { margin-bottom: 1.5rem; padding: 1rem; border-radius: 8px; background: #f7fafc; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
              .title { color: #3182ce; margin: 0; }
              .content { color: #4a5568; margin: 0.5rem 0; }
              .category { font-size: 12px; color: #718096; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>All Blog Posts</h1>
              <div class="welcome">Welcome, Shacni!</div>
              <ul>
                ${posts.map(post => `
                  <li>
                    <h3 class="title">${post.title}</h3>
                    <p class="content">${post.content?.slice(0, 100)}${post.content?.length > 100 ? '...' : ''}</p>
                    <span class="category">Category: ${post.category?.name || 'Uncategorized'}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </body>
        </html>
      `);
    } else {
      res.json(posts);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const post = new Post({ title, content, category });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

module.exports = router; 