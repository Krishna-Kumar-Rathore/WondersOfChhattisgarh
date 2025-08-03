import { useState, useEffect } from 'react';
import { placesAPI } from '../services/api';
import PlaceCard from '../components/PlaceCard';
import { toast } from 'react-toastify';

function PlacesToGo() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [groupedPlaces, setGroupedPlaces] = useState({});
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const categories = ['Natural', 'Adventure', 'Historic', 'Religious'];

  useEffect(() => {
    fetchPlaces();
    fetchCities();
  }, []);

  useEffect(() => {
    filterAndGroupPlaces();
  }, [places, searchTerm, selectedCity, selectedCategory]);

  const fetchPlaces = async () => {
    try {
      const response = await placesAPI.getAll();
      setPlaces(response.data.places);
    } catch (error) {
      toast.error('Failed to fetch places');
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await placesAPI.getCities();
      setCities(response.data.cities);
    } catch (error) {
      console.error('Failed to fetch cities');
    }
  };

  const filterAndGroupPlaces = () => {
    let filtered = places;
    let hasActiveFilters = searchTerm || selectedCity || selectedCategory;
    setIsFiltered(hasActiveFilters);

    // Apply filters
    if (searchTerm) {
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(place =>
        place.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(place =>
        place.category === selectedCategory
      );
    }

    setFilteredPlaces(filtered);

    // Group places by city
    const grouped = filtered.reduce((acc, place) => {
      const city = place.city;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(place);
      return acc;
    }, {});

    // Sort cities by number of places (descending)
    const sortedGrouped = Object.keys(grouped)
      .sort((a, b) => grouped[b].length - grouped[a].length)
      .reduce((acc, city) => {
        acc[city] = grouped[city];
        return acc;
      }, {});

    setGroupedPlaces(sortedGrouped);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedCategory('');
  };

  const openGoogleMaps = (cityName) => {
    const query = encodeURIComponent(`${cityName}, Chhattisgarh, India`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading places...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Places To Go</h1>
          <p className="text-xl text-gray-600">
            Discover all the amazing destinations Chhattisgarh has to offer
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Places
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by place name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* City Filter */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {isFiltered 
                ? `Showing ${filteredPlaces.length} filtered results from ${Object.keys(groupedPlaces).length} cities`
                : `Showing ${filteredPlaces.length} places from ${Object.keys(groupedPlaces).length} cities`
              }
            </div>
            {(searchTerm || selectedCity || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Places Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.keys(groupedPlaces).length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No places found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCity || selectedCategory
                ? 'Try adjusting your search criteria'
                : 'No places have been added yet'
              }
            </p>
            {(searchTerm || selectedCity || selectedCategory) && (
              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedPlaces).map(([city, cityPlaces]) => (
              <div key={city} className="city-section">
                {/* City Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-3xl font-bold text-gray-900">{city}</h2>
                    <button
                      onClick={() => openGoogleMaps(city)}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
                      title={`View ${city} on Google Maps`}
                    >
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-sm font-medium">View on Map</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {cityPlaces.length} {cityPlaces.length === 1 ? 'place' : 'places'}
                  </div>
                </div>

                {/* Places Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cityPlaces.map((place) => (
                    <PlaceCard key={place._id} place={place} />
                  ))}
                </div>

                {/* Separator line (except for last city) */}
                {Object.keys(groupedPlaces).indexOf(city) !== Object.keys(groupedPlaces).length - 1 && (
                  <div className="mt-12 border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacesToGo;