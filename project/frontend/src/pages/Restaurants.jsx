import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Star, Utensils, Clock, Users, Leaf } from 'lucide-react';

const mockRestaurants = [
  {
    id: 1,
    name: "Spice Route Cafe",
    price: 450,
    rating: 4.5,
    distance: '1.8 km from center',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Authentic Indian', 'Student Discount', 'Cozy Ambiance'],
    location: 'Khan Market',
    cuisine: 'Indian',
    timing: '11 AM - 11 PM'
  },
  {
    id: 2,
    name: "Street Food Paradise",
    price: 200,
    rating: 4.3,
    distance: '0.8 km from center',
    image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Budget Friendly', 'Local Flavors', 'Quick Bites'],
    location: 'Chandni Chowk',
    cuisine: 'Street Food',
    timing: '10 AM - 10 PM'
  },
  {
    id: 3,
    name: "The Green Bowl",
    price: 350,
    rating: 4.4,
    distance: '2.1 km from center',
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Healthy Options', 'Vegan Friendly', 'Fresh Ingredients'],
    location: 'Hauz Khas',
    cuisine: 'Continental',
    timing: '9 AM - 9 PM'
  },
  {
    id: 4,
    name: "Desi Dhaba",
    price: 300,
    rating: 4.2,
    distance: '3.5 km from center',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Traditional Food', 'Large Portions', 'Family Style'],
    location: 'Lajpat Nagar',
    cuisine: 'North Indian',
    timing: '12 PM - 12 AM'
  },
  {
    id: 5,
    name: "Cafe Mocha",
    price: 250,
    rating: 4.1,
    distance: '1.2 km from center',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Great Coffee', 'Study Friendly', 'WiFi Available'],
    location: 'CP Metro',
    cuisine: 'Cafe',
    timing: '8 AM - 11 PM'
  },
  {
    id: 6,
    name: "Biryani House",
    price: 400,
    rating: 4.6,
    distance: '2.8 km from center',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Authentic Biryani', 'Generous Portions', 'Takeaway Available'],
    location: 'Old Delhi',
    cuisine: 'Mughlai',
    timing: '1 PM - 11 PM'
  }
];

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [budget, setBudget] = useState(parseInt(searchParams.get('budget') || '5000'));
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cuisineFilter, setCuisineFilter] = useState('all');

  const cuisines = ['all', 'Indian', 'Street Food', 'Continental', 'North Indian', 'Cafe', 'Mughlai'];

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, []);

  const handleSearch = () => {
    if (!city.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = mockRestaurants.filter(restaurant => restaurant.price <= budget);
      
      if (cuisineFilter !== 'all') {
        filtered = filtered.filter(restaurant => restaurant.cuisine === cuisineFilter);
      }
      
      setRestaurants(filtered);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing
            <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              {' '}Food
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the best restaurants, cafes, and street food that fit your budget and taste
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget per Meal (INR)
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="text-center">
                  <span className="font-semibold text-green-600">₹{budget}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!city.trim() || isLoading}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Find Food</span>
                </div>
              )}
            </button>
          </div>

          {/* Cuisine Filter */}
          <div className="flex flex-wrap gap-2">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setCuisineFilter(cuisine)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cuisineFilter === cuisine
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine === 'all' ? 'All Cuisines' : cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {restaurants.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Best Restaurants in {city}
              </h2>
              <p className="text-gray-600">
                Found {restaurants.length} restaurants within your budget of ₹{budget} per meal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Utensils className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {restaurant.cuisine}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{restaurant.location}</span>
                      <span className="text-sm">• {restaurant.distance}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{restaurant.timing}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">₹{restaurant.price}</span>
                      <span className="text-sm text-gray-500">/ meal</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all">
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {restaurants.length === 0 && city && !isLoading && (
          <div className="text-center py-12">
            <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your budget or cuisine filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;