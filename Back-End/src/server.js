// src/server.js
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;

connectDB();

// Verify app is an Express instance
if (typeof app.listen === 'function') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
} else {
  console.error('Error: app is not a valid Express application');
  process.exit(1);
}