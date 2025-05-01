const User = require('../models/User');
const { generateToken, comparePasswords } = require('../utils/auth');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, studentId } = req.body;
    
    // Default to student role if not specified
    const userRole = role || 'student';
    
    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
      studentId: userRole === 'student' ? studentId : undefined
    });

    

    res.status(201).json({
      success: true,
      role: user.role
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  console.log('Login attempt:', req.body); 
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // 1. Prevent self-deletion
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account'
      });
    }

    // 2. Find the user first to verify existence
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // 3. Role-based permission checks
    if (req.user.role === 'teacher') {
      // Teachers can only deactivate students
      if (userToDelete.role !== 'student') {
        return res.status(403).json({
          success: false,
          message: 'Teachers can only deactivate student accounts'
        });
      }
      
      // Teachers cannot deactivate other teachers/admins
      if (['teacher', 'admin'].includes(userToDelete.role)) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient privileges to deactivate this account'
        });
      }
    }

    // 4. Admins cannot deactivate other admins (optional safeguard)
    if (req.user.role === 'admin' && userToDelete.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin accounts require super-admin privileges to deactivate'
      });
    }

    // 5. Soft delete by setting isActive to 0
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isActive: 0,
        deletedAt: Date.now() 
      },
      { new: true, select: '-password' }
    );

    // 6. Log the deactivation (optional)
    console.log(`User ${updatedUser.email} deactivated by ${req.user.email}`);

    res.status(200).json({
      success: true,
      data: {
        message: 'User account deactivated successfully',
        user: updatedUser
      }
    });

  } catch (err) {
    next(err);
  }
};