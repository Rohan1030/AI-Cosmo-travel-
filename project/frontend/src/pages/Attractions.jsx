import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Star, MapPin as AttractionIcon, Clock, Camera, Users } from 'lucide-react';

const Attractions = () => {
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [budget, setBudget] = useState(parseInt(searchParams.get('budget') || '5000'));
  const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'architecture', 'cultural', 'historic', 'religion', 'natural'];

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, []);


  const handleSearch = async () => {
  if (!city.trim()) return;

  setIsLoading(true);
  setAttractions([]);

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(city)}&format=json&apiKey=eab089c330054a6da357cc4c7fe683ca`
    );

    const data = await response.json();

    // Example: Geoapify returns results in `features`
    let places = [];
    if (data.features && Array.isArray(data.features)) {
      places = data.features.map((feature) => ({
        name: feature.properties.formatted,
        kinds: 'general',
        dist_meters: 1000, // You may not get this from Geoapify autocomplete directly
        estimated_cost: Math.floor(Math.random() * budget), // Fake cost
      }));
    }

    let filtered = places;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((place) =>
        place.kinds && place.kinds.includes(categoryFilter)
      );
    }

    const finalData = filtered.map((place, index) => ({
      id: index,
      name: place.name || 'Unknown Place',
      price: place.estimated_cost || 0,
      rating: Math.floor(Math.random() * (5 - 4) + 4).toFixed(1),
      distance: `${(place.dist_meters / 1000).toFixed(1)} km from center`,
      image: `https://source.unsplash.com/400x300/?${place.name},${city}`,
      highlights: place.kinds ? place.kinds.split(',').slice(0, 3) : [],
      location: city,
      category: place.kinds ? place.kinds.split(',')[0] : 'General',
      timing: '9 AM - 6 PM',
      duration: '1-2 hours',
    }));

    setAttractions(finalData);
  } catch (err) {
    console.error('Error fetching places:', err);
  } finally {
    setIsLoading(false);
  }
};






  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Amazing
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {' '}Places
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover historical monuments, parks, museums, and cultural attractions that fit your budget
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City or Area
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Delhi, Mumbai, Bangalore"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entry Budget (INR)
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="25"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="text-center">
                  <span className="font-semibold text-purple-600">
                    {budget === 0 ? 'Free' : `₹${budget}`}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!city.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Explore</span>
                </div>
              )}
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoryFilter === category
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {attractions.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Top Attractions in {city}
              </h2>
              <p className="text-gray-600">
                Found {attractions.length} attractions within your budget of {budget === 0 ? 'free entry' : `₹${budget}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction) => (
                <div
                  key={attraction.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <AttractionIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{attraction.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {attraction.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{attraction.location}</span>
                      <span className="text-sm">• {attraction.distance}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{attraction.timing}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{attraction.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        {attraction.price === 0 ? 'Free' : `₹${attraction.price}`}
                      </span>
                      <span className="text-sm text-gray-500">entry</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {attraction.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all">
                      Get Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {attractions.length === 0 && city && !isLoading && (
          <div className="text-center py-12">
            <AttractionIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No attractions found</h3>
            <p className="text-gray-600">Try adjusting your budget or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attractions;
