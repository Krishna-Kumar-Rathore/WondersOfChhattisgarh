const express = require('express');
const Place = require('../models/Place');
const User = require('../models/User');
const Review = require('../models/Review');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalPlaces = await Place.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalReviews = await Review.countDocuments();
    const featuredPlaces = await Place.countDocuments({ isFeatured: true });

    res.json({
      stats: {
        totalPlaces,
        totalUsers,
        totalReviews,
        featuredPlaces
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all places for admin management
router.get('/places', adminAuth, async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json({ places });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle featured status
router.patch('/places/:id/featured', adminAuth, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    place.isFeatured = !place.isFeatured;
    await place.save();

    res.json({ 
      message: `Place ${place.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      place 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all reviews with place and user info
router.get('/reviews', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('place', 'name city')
      .sort({ createdAt: -1 });
    
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;