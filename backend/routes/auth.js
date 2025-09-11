// routes/auth.js
const express = require('express');
const User = require('../models/User');
const { auth, jwtAuth } = require('../middleware/auth');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');
const passport = require('../config/passport');
const { OAuth2Client } = require('google-auth-library');


const router = express.Router(); 

// Enhanced signup with JWT
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (password will be hashed by pre-save middleware)
    const user = new User({
      name,
      email,
      password,
      authMethod: 'local'
    });

    await user.save();

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      tokens: {
        accessToken,
        refreshToken
      },
      authMethod: 'jwt'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enhanced login with JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      tokens: {
        accessToken,
        refreshToken
      },
      authMethod: 'jwt'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      // Generate JWT tokens for Google user
      const { accessToken, refreshToken } = generateTokens(req.user._id);
      
      // Redirect to frontend with tokens
      const redirectURL = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/success?token=${accessToken}&refresh=${refreshToken}&user=${encodeURIComponent(JSON.stringify({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin
      }))}`;
      
      res.redirect(redirectURL);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error`);
    }
  }
);

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }
    
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
    
    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Legacy and JWT compatible endpoints
router.get('/user', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin
      },
      authMethod: req.authMethod
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Wishlist routes (compatible with both auth methods)
router.post('/wishlist/add', auth, async (req, res) => {
  try {
    const { placeId } = req.body;
    
    if (!req.user.wishlist.includes(placeId)) {
      req.user.wishlist.push(placeId);
      await req.user.save();
    }
    
    res.json({ message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/wishlist/remove', auth, async (req, res) => {
  try {
    const { placeId } = req.body;
    
    req.user.wishlist = req.user.wishlist.filter(id => id.toString() !== placeId);
    await req.user.save();
    
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Add this to your routes/auth.js file


// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Add this route to your existing auth routes
router.post('/google/verify', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId });

    if (user) {
      // User exists, log them in
      const { accessToken, refreshToken } = generateTokens(user._id);

      return res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        },
        tokens: {
          accessToken,
          refreshToken
        },
        authMethod: 'google'
      });
    }

    // Check if user exists with same email (link accounts)
    user = await User.findOne({ email });

    if (user) {
      // Link Google account to existing user
      user.googleId = googleId;
      user.authMethod = user.authMethod === 'local' ? 'both' : 'google';
      await user.save();

      const { accessToken, refreshToken } = generateTokens(user._id);

      return res.json({
        message: 'Account linked and login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        },
        tokens: {
          accessToken,
          refreshToken
        },
        authMethod: 'google'
      });
    }

    // Create new user
    user = new User({
      name,
      email,
      googleId,
      authMethod: 'google'
      // No password needed for Google users
    });

    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(201).json({
      message: 'Account created and login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      tokens: {
        accessToken,
        refreshToken
      },
      authMethod: 'google'
    });

  } catch (error) {
    console.error('Google verification error:', error);
    
    if (error.message && error.message.includes('Token used too early')) {
      return res.status(400).json({ message: 'Invalid Google token. Please try again.' });
    }
    
    res.status(500).json({ 
      message: 'Google authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Authentication error'
    });
  }
});

module.exports = router;