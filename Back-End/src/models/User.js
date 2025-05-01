// models/User.js
const mongoose = require('mongoose');
const { hashPassword } = require('../utils/auth');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  studentId: {
    type: String,
    required: function() { return this.role === 'student'; }
  },
  isActive: {
    type: Number,
    enum: [0, 1], // Only allow 0 or 1
    default: 1
  },
  deletedAt: {
    type: Date,
    default: null
  },
  department: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});
userSchema.pre(/^find/, function(next) {
  this.where({ isActive: 1 });
  next();
});
module.exports = mongoose.model('User', userSchema);