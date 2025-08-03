const express = require('express');
const Review = require('../models/Review');
const Place = require('../models/Place');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get reviews for a place
router.get('/:placeId', async (req, res) => {
  try {
    const reviews = await Review.find({ place: req.params.placeId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a review
router.post('/', auth, async (req, res) => {
  try {
    const { placeId, rating, comment } = req.body;

    // Check if user already reviewed this place
    const existingReview = await Review.findOne({
      user: req.user._id,
      place: placeId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this place' });
    }

    // Create new review
    const review = new Review({
      user: req.user._id,
      place: placeId,
      rating,
      comment
    });

    await review.save();

    // Update place's average rating and total reviews
    await updatePlaceRating(placeId);

    // Populate user info for response
    await review.populate('user', 'name');

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a review
router.put('/:reviewId', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const review = await Review.findOne({
      _id: req.params.reviewId,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update place's average rating
    await updatePlaceRating(review.place);

    await review.populate('user', 'name');
    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a review
router.delete('/:reviewId', auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    // Update place's average rating
    await updatePlaceRating(review.place);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to update place rating
async function updatePlaceRating(placeId) {
  const reviews = await Review.find({ place: placeId });
  
  if (reviews.length === 0) {
    await Place.findByIdAndUpdate(placeId, {
      averageRating: 0,
      totalReviews: 0
    });
  } else {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    await Place.findByIdAndUpdate(placeId, {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: reviews.length
    });
  }
}

module.exports = router;