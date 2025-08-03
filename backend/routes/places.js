const express = require('express');
const Place = require('../models/Place');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get featured places (for Be Inspired page)
router.get('/featured', async (req, res) => {
  try {
    const places = await Place.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.json({ places });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all places (for PlacesToGo page)
router.get('/all', async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json({ places });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search places by city and category
router.get('/search', async (req, res) => {
  try {
    const { city, category } = req.query;
    let query = {};

    if (city) {
      query.city = new RegExp(city, 'i'); // Case insensitive search
    }

    if (category) {
      query.category = category;
    }

    const places = await Place.find(query).sort({ createdAt: -1 });
    res.json({ places });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single place by ID
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ place });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new place (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, city, category, images, isFeatured } = req.body;

    const place = new Place({
      name,
      description,
      city,
      category,
      images,
      isFeatured: isFeatured || false
    });

    await place.save();
    res.status(201).json({ message: 'Place added successfully', place });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update place (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json({ message: 'Place updated successfully', place });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete place (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get unique cities for filter dropdown
router.get('/filters/cities', async (req, res) => {
  try {
    const cities = await Place.distinct('city');
    res.json({ cities });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;