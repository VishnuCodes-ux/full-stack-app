const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');

const {
  register,
  login,
  getMe,
  getUsers,
  deleteUser
} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/get-users', protect, getUsers);
router.post('/:id', protect, restrictTo('admin', 'teacher'), deleteUser);

module.exports = router;
