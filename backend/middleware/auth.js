const User = require('../models/User');

// Simple auth middleware without JWT
const auth = async (req, res, next) => {
  try {
    const userId = req.header('user-id');
    
    if (!userId) {
      return res.status(401).json({ message: 'Access denied. No user ID provided.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user ID.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid user ID.' });
  }
};

// Admin middleware
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});
    
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin rights required.' });
    }
    
    next();
  } catch (error) {
    res.status(400).json({ message: 'Admin authentication failed.' });
  }
};

module.exports = { auth, adminAuth };