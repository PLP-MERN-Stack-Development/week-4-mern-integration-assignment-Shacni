// server.js - Main server file for the MERN blog application

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>MERN Blog API</title>
        <style>
          body { background: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 0; }
          .container { max-width: 600px; margin: 5rem auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2.5rem 2rem; text-align: center; }
          h1 { color: #3182ce; margin-bottom: 0.5rem; }
          p { color: #4a5568; margin-bottom: 2rem; }
          .links a { display: inline-block; margin: 0 0.5rem; color: #3182ce; text-decoration: none; font-weight: 600; }
          .links a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 MERN Blog API</h1>
          <p>Welcome to the backend API for the MERN Blog Application.<br/>You can use the endpoints below to interact with the app.</p>
          <div class="links">
            <a href="/api/posts" target="_blank">View Posts API</a>
            <a href="/api/categories" target="_blank">View Categories API</a>
            <a href="https://github.com/PLP-MERN-Stack-Development/week-4-mern-integration-assignment-Shacni" target="_blank">GitHub Repo</a>
          </div>
          <p style="margin-top:2rem;font-size:0.95em;color:#718096;">Made with <span style="color:#e53e3e">&#10084;</span> using MongoDB, Express, React, and Node.js</p>
        </div>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app; 