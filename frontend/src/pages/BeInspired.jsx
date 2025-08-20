import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placesAPI } from '../services/api';
import PlaceCard from '../components/PlaceCard';
import { toast } from 'react-toastify';


function BeInspired() {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPlaces();
  }, []);

  const fetchFeaturedPlaces = async () => {
    try {
      const response = await placesAPI.getFeatured();
      setFeaturedPlaces(response.data.places);
    } catch (error) {
      toast.error('Failed to fetch featured places');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-32 h-32 border-b-2 rounded-full animate-spin border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading amazing places...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="relative flex items-center justify-center bg-center bg-cover h-96"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dcwgv3imm/image/upload/v1755714383/CGimg_2_gyixra.png')"
          }}
        >
          <div className="z-10 text-center">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">
              Wonders of Chhattisgarh
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl">
              Discover the hidden gems, ancient temples, lush forests, and vibrant culture of India's heart
            </p>
            <Link
              to="/places"
              className="inline-block px-8 py-3 font-semibold transition-colors bg-white rounded-lg text-primary-600 hover:bg-gray-100"
            >
              Explore All Places
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Places Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Featured Destinations
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Hand-picked destinations that showcase the best of Chhattisgarh's natural beauty, 
              rich heritage, and cultural diversity
            </p>
          </div>

          {featuredPlaces.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="mb-4 text-2xl font-semibold text-gray-700">
                No Featured Places Yet
              </h3>
              <p className="mb-6 text-gray-600">
                Our team is curating the best destinations for you. Check back soon!
              </p>
              <Link
                to="/places"
                className="px-6 py-3 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                Browse All Places
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPlaces.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Chhattisgarh Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Why Choose Chhattisgarh?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Natural Beauty</h3>
              <p className="text-gray-600">
                Pristine forests, stunning waterfalls, and diverse wildlife
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Rich Heritage</h3>
              <p className="text-gray-600">
                Ancient temples, historical monuments, and archaeological wonders
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Tribal Culture</h3>
              <p className="text-gray-600">
                Vibrant tribal traditions, folk arts, and authentic experiences
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Adventure</h3>
              <p className="text-gray-600">
                Trekking, wildlife safaris, river rafting, and cave exploration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="py-16 text-white bg-primary-600">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Explore Chhattisgarh?
          </h2>
          <p className="mb-8 text-xl">
            Start planning your journey through India's best-kept secret destination
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/places"
              className="px-8 py-3 font-semibold transition-colors bg-white rounded-lg text-primary-600 hover:bg-gray-100"
            >
              Browse All Places
            </Link>
            <Link
              to="/things-to-do"
              className="px-8 py-3 font-semibold text-white transition-colors bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-primary-600"
            >
              Things To Do
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default BeInspired;