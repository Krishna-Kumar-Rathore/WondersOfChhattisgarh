import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';
import PlaceCard from '../components/PlaceCard';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please login to view your wishlist');
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, [navigate]);

  const fetchWishlist = async () => {
    try {
      const response = await authAPI.getWishlist();
      setWishlist(response.data.wishlist);
    } catch (error) {
      toast.error('Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistUpdate = (placeId) => {
    setWishlist(wishlist.filter(place => place._id !== placeId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-xl text-gray-600">
            Your saved places to visit in Chhattisgarh
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding places you'd like to visit to your wishlist. 
              You can find amazing destinations to explore!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/places"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse Places
              </Link>
              <Link
                to="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Featured Destinations
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'place' : 'places'} in your wishlist
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((place) => (
                <PlaceCard 
                  key={place._id} 
                  place={place} 
                  isWishlistItem={true}
                  onWishlistUpdate={handleWishlistUpdate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;