import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Star, Building, Wifi, Car, Coffee } from 'lucide-react';

const mockHotels = [
  {
    id: 1,
    name: "The Backpacker's Haven",
    price: 1200,
    rating: 4.2,
    distance: '2.3 km from center',
    image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Free WiFi', 'Rooftop Terrace', 'Shared Kitchen'],
    location: 'Connaught Place',
    amenities: ['WiFi', 'Parking', 'Breakfast']
  },
  {
    id: 2,
    name: "Urban Dorm Hostel",
    price: 800,
    rating: 4.0,
    distance: '1.5 km from center',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Modern Amenities', 'Common Areas', '24/7 Reception'],
    location: 'Karol Bagh',
    amenities: ['WiFi', 'Reception', 'Lounge']
  },
  {
    id: 3,
    name: "Budget Inn Central",
    price: 1500,
    rating: 4.3,
    distance: '1.8 km from center',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Clean Rooms', 'AC Available', 'Near Metro'],
    location: 'Paharganj',
    amenities: ['WiFi', 'AC', 'Breakfast']
  },
  {
    id: 4,
    name: "Student Lodge",
    price: 600,
    rating: 3.8,
    distance: '3.2 km from center',
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Student Discount', 'Study Areas', 'Budget Friendly'],
    location: 'Lajpat Nagar',
    amenities: ['WiFi', 'Study Room', 'Kitchen']
  },
  {
    id: 5,
    name: "Cozy Corner Hotel",
    price: 2000,
    rating: 4.5,
    distance: '0.8 km from center',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Prime Location', 'Comfortable Beds', 'Room Service'],
    location: 'Central Delhi',
    amenities: ['WiFi', 'Room Service', 'Parking']
  },
  {
    id: 6,
    name: "Traveler's Rest",
    price: 900,
    rating: 4.1,
    distance: '2.7 km from center',
    image: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=400',
    highlights: ['Quiet Area', 'Garden View', 'Complimentary Tea'],
    location: 'Green Park',
    amenities: ['WiFi', 'Garden', 'Tea Service']
  }
];

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [budget, setBudget] = useState(parseInt(searchParams.get('budget') || '5000'));
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, []);

  const handleSearch = () => {
    if (!city.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = mockHotels.filter(hotel => hotel.price <= budget);
      setHotels(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'breakfast': return <Coffee className="w-4 h-4" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              {' '}Stay
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover budget-friendly hotels, hostels, and accommodations that fit your travel style
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City or Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Delhi, Mumbai, Bangalore"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget per Night (INR)
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="text-center">
                  <span className="font-semibold text-blue-600">₹{budget}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!city.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Find Hotels</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {hotels.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available Hotels in {city}
              </h2>
              <p className="text-gray-600">
                Found {hotels.length} hotels within your budget of ₹{budget} per night
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{hotel.location}</span>
                      <span className="text-sm">• {hotel.distance}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">₹{hotel.price}</span>
                      <span className="text-sm text-gray-500">/ night</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-1 text-gray-600">
                          {getAmenityIcon(amenity)}
                          <span className="text-xs">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hotels.length === 0 && city && !isLoading && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600">Try adjusting your budget or search for a different city</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;