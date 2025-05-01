const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

module.exports = app;
