import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { placesAPI, adminAPI } from '../services/api';

function Admin() {
  const [activeTab, setActiveTab] = useState('add-place');
  const [places, setPlaces] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  // Add Place Form State
  const [placeForm, setPlaceForm] = useState({
    name: '',
    description: '',
    city: '',
    category: 'Natural',
    images: [''],
    isFeatured: false
  });

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      toast.error('Access denied. Admin rights required.');
      return;
    }

    fetchStats();
    fetchPlaces();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await adminAPI.getPlaces();
      setPlaces(response.data.places);
    } catch (error) {
      toast.error('Failed to fetch places');
    }
  };

  const handlePlaceFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlaceForm({
      ...placeForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...placeForm.images];
    newImages[index] = value;
    setPlaceForm({
      ...placeForm,
      images: newImages
    });
  };

  const addImageField = () => {
    setPlaceForm({
      ...placeForm,
      images: [...placeForm.images, '']
    });
  };

  const removeImageField = (index) => {
    const newImages = placeForm.images.filter((_, i) => i !== index);
    setPlaceForm({
      ...placeForm,
      images: newImages
    });
  };

  const resetForm = () => {
    setPlaceForm({
      name: '',
      description: '',
      city: '',
      category: 'Natural',
      images: [''],
      isFeatured: false
    });
    setEditingPlace(null);
  };

  const handleSubmitPlace = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty image URLs
      const validImages = placeForm.images.filter(img => img.trim() !== '');
      
      if (validImages.length === 0) {
        toast.error('Please add at least one image URL');
        setLoading(false);
        return;
      }

      const placeData = {
        ...placeForm,
        images: validImages
      };

      if (editingPlace) {
        // Update existing place
        await placesAPI.update(editingPlace._id, placeData);
        toast.success('Place updated successfully!');
      } else {
        // Create new place
        await placesAPI.create(placeData);
        toast.success('Place added successfully!');
      }
      
      // Reset form
      resetForm();

      // Refresh data
      fetchStats();
      fetchPlaces();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save place');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlace = (place) => {
    setPlaceForm({
      name: place.name,
      description: place.description,
      city: place.city,
      category: place.category,
      images: place.images.length > 0 ? place.images : [''],
      isFeatured: place.isFeatured
    });
    setEditingPlace(place);
    setActiveTab('add-place'); // Switch to form tab
  };

  const handleDeletePlace = async (placeId) => {
    if (!window.confirm('Are you sure you want to delete this place?')) {
      return;
    }

    try {
      await placesAPI.delete(placeId);
      toast.success('Place deleted successfully');
      fetchPlaces();
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete place');
    }
  };

  const toggleFeatured = async (placeId) => {
    try {
      await adminAPI.toggleFeatured(placeId);
      toast.success('Featured status updated');
      fetchPlaces();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update featured status');
    }
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need admin rights to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Places</h3>
            <p className="text-3xl font-bold text-primary-600">{stats.totalPlaces || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Featured Places</h3>
            <p className="text-3xl font-bold text-secondary-600">{stats.featuredPlaces || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Reviews</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalReviews || 0}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('add-place')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'add-place'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {editingPlace ? 'Edit Place' : 'Add Place'}
              </button>
              <button
                onClick={() => setActiveTab('manage-places')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'manage-places'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Places
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'add-place' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {editingPlace ? 'Edit Tourist Place' : 'Add New Tourist Place'}
                  </h2>
                  {editingPlace && (
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
                
                <form onSubmit={handleSubmitPlace} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Place Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={placeForm.name}
                        onChange={handlePlaceFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={placeForm.city}
                        onChange={handlePlaceFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={placeForm.category}
                        onChange={handlePlaceFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="Natural">Natural</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Historic">Historic</option>
                        <option value="Religious">Religious</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={placeForm.isFeatured}
                        onChange={handlePlaceFormChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Mark as Featured
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={placeForm.description}
                      onChange={handlePlaceFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URLs
                    </label>
                    {placeForm.images.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="url"
                          placeholder="Enter image URL"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {placeForm.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addImageField}
                      className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Add Another Image
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                    >
                      {loading 
                        ? (editingPlace ? 'Updating Place...' : 'Adding Place...') 
                        : (editingPlace ? 'Update Place' : 'Add Place')
                      }
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'manage-places' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Manage Places</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Place
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          City
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Featured
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {places.map((place) => (
                        <tr key={place._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={place.images[0] || '/placeholder.jpg'}
                                alt={place.name}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {place.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {place.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                              {place.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {place.isFeatured ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Yes
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEditPlace(place)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => toggleFeatured(place._id)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              {place.isFeatured ? 'Unfeature' : 'Feature'}
                            </button>
                            <button
                              onClick={() => handleDeletePlace(place._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;