import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';

function PlaceCard({ place, isWishlistItem = false, onWishlistUpdate }) {
  const [isInWishlist, setIsInWishlist] = useState(isWishlistItem);
  const [loading, setLoading] = useState(false);

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking wishlist button
    
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please login to add to wishlist');
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist) {
        await authAPI.removeFromWishlist(place._id);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
        if (onWishlistUpdate) onWishlistUpdate(place._id);
      } else {
        await authAPI.addToWishlist(place._id);
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
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

  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <Link to={`/place/${place._id}`}>
        <div className="relative">
          <img
            src={place.images[0] || '/placeholder.jpg'}
            alt={place.name}
            className="object-cover w-full h-48 transition-transform duration-500 ease-in-out hover:scale-110"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-sm text-white bg-green-600 rounded">
              {place.category}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <button
              onClick={handleWishlistToggle}
              disabled={loading}
              className={`p-2 rounded-full ${
                isInWishlist 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">{place.name}</h3>
          <p className="mb-2 text-sm text-gray-600">{place.city}</p>
          <p className="mb-3 text-sm text-gray-700 line-clamp-2">
            {place.description}
          </p>
          
          {place.averageRating > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {renderStars(place.averageRating)}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {place.averageRating.toFixed(1)} ({place.totalReviews} reviews)
              </span>
            </div>
          )}

          {place.isFeatured && (
            <div className="mb-2">
              <span className="px-2 py-1 text-xs font-medium rounded bg-secondary-100 text-secondary-700">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default PlaceCard;