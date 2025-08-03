import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placesAPI, reviewsAPI, authAPI } from '../services/api';

function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetchPlaceDetails();
    fetchReviews();
    if (userId) {
      checkWishlistStatus();
    }
  }, [id, userId]);

  const fetchPlaceDetails = async () => {
    try {
      const response = await placesAPI.getById(id);
      setPlace(response.data.place);
    } catch (error) {
      toast.error('Failed to fetch place details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewsAPI.getByPlace(id);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Failed to fetch reviews');
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const response = await authAPI.getWishlist();
      const wishlistIds = response.data.wishlist.map(item => item._id);
      setIsInWishlist(wishlistIds.includes(id));
    } catch (error) {
      console.error('Failed to check wishlist status');
    }
  };

  const handleWishlistToggle = async () => {
    if (!userId) {
      toast.error('Please login to add to wishlist');
      return;
    }

    try {
      if (isInWishlist) {
        await authAPI.removeFromWishlist(id);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await authAPI.addToWishlist(id);
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error('Please login to add a review');
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await reviewsAPI.create({
        placeId: id,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });

      setReviews([response.data.review, ...reviews]);
      setReviewForm({ rating: 5, comment: '' });
      setShowReviewForm(false);
      toast.success('Review added successfully!');
      
      // Refresh place details to update average rating
      fetchPlaceDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return stars;
  };

  const renderRatingStars = (rating, onClick) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onClick && onClick(star)}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading place details...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Place Not Found</h2>
          <p className="text-gray-600 mb-6">The place you're looking for doesn't exist.</p>
          <Link
            to="/places"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse All Places
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative">
        <div className="w-full bg-gray-200">
          <img
            src={place.images[currentImageIndex] || '/placeholder.jpg'}
            alt={place.name}
            className="w-full h-auto max-h-96 object-contain bg-gray-100"
            style={{ minHeight: '300px' }}
          />
          
          {/* Image Navigation */}
          {place.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : place.images.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentImageIndex(currentImageIndex < place.images.length - 1 ? currentImageIndex + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {place.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleWishlistToggle}
            className={`p-3 rounded-full ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            } transition-colors shadow-lg`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Place Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{place.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {place.city}
                    </span>
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                      {place.category}
                    </span>
                    {place.isFeatured && (
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Rating */}
              {place.averageRating > 0 && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {renderStars(place.averageRating)}
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-700">
                    {place.averageRating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-gray-600">
                    ({place.totalReviews} {place.totalReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Place</h2>
                <p className="text-gray-700 leading-relaxed">{place.description}</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Reviews ({reviews.length})
                </h2>
                {userId && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    {renderRatingStars(reviewForm.rating, (rating) => 
                      setReviewForm({ ...reviewForm, rating })
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Share your experience about this place..."
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    No reviews yet. Be the first to review this place!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-600">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{place.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">City:</span>
                  <span className="font-medium">{place.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">
                    {place.averageRating > 0 ? `${place.averageRating.toFixed(1)}/5` : 'No ratings yet'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{place.totalReviews}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3">Explore More</h4>
                <div className="space-y-2">
                  <Link
                    to={`/places?city=${place.city}`}
                    className="block text-primary-600 hover:text-primary-700 text-sm"
                  >
                    More places in {place.city}
                  </Link>
                  <Link
                    to={`/places?category=${place.category}`}
                    className="block text-primary-600 hover:text-primary-700 text-sm"
                  >
                    More {place.category} places
                  </Link>
                  <Link
                    to="/places"
                    className="block text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Browse all places
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;