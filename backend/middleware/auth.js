// middleware/auth.js
const User = require('../models/User');
const { verifyAccessToken } = require('../utils/jwt');

// Enhanced auth middleware (supports both JWT and legacy)
const auth = async (req, res, next) => {
  try {
    // Check for JWT token first
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        req.authMethod = 'jwt';
        return next();
      } catch (jwtError) {
        // JWT failed, fallback to legacy auth
      }
    }
    
    // Fallback to legacy user-id header
    const userId = req.header('user-id');
    if (!userId) {
      return res.status(401).json({ message: 'Access denied. No authentication provided.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user ID.' });
    }

    req.user = user;
    req.authMethod = 'legacy';
    next();
  } catch (error) {
    res.status(400).json({ message: 'Authentication failed.' });
  }
};

// JWT-only middleware for new endpoints
const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. JWT token required.' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid JWT token' });
  }
};

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

module.exports = { auth, jwtAuth, adminAuth };