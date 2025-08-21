import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Building, Utensils, MapPin as Attraction, Sparkles, Zap, Target, TrendingUp, Heart, Star } from 'lucide-react';

const Home = () => {
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState(5000);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (!city.trim()) {
      alert('Yo! Drop that city name first! 📍');
      return;
    }
    navigate(`/${category}?city=${encodeURIComponent(city)}&budget=${budget}`);
  };

  const trendingCities = [
    { name: 'Goa', emoji: '🏖️', vibe: 'Beach Vibes' },
    { name: 'Delhi', emoji: '🏛️', vibe: 'Historic Feels' },
    { name: 'Mumbai', emoji: '🌃', vibe: 'City Life' },
    { name: 'Bangalore', emoji: '🌿', vibe: 'Tech Hub' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-6xl animate-bounce">🌟</span>
              <h2 className="text-6xl sm:text-7xl font-black text-white drop-shadow-2xl">
                Let's Explore
              </h2>
              <span className="text-6xl animate-bounce delay-300">✨</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white/90 mb-6">
              Your Next
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                {' '}Adventure
              </span>
            </div>
          </div>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
            Find budget-friendly spots that hit different! 🔥 Perfect for students & young explorers who want maximum vibes for minimum coins 💰
          </p>

          {/* Trending Cities */}
          <div className="mb-8">
            <p className="text-white/80 mb-4 font-bold">🔥 Trending Destinations</p>
            <div className="flex flex-wrap justify-center gap-3">
              {trendingCities.map((cityData) => (
                <button
                  key={cityData.name}
                  onClick={() => setCity(cityData.name)}
                  className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/30 hover:bg-white/30 transition-all transform hover:scale-105"
                >
                  <span className="text-lg">{cityData.emoji}</span>
                  <span className="text-white font-bold">{cityData.name}</span>
                  <span className="text-white/70 text-xs">{cityData.vibe}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-3 flex items-center space-x-2">
                  <span>📍</span>
                  <span>Where to next?</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-purple-500" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Delhi, Mumbai, Goa..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-3 flex items-center space-x-2">
                  <span>💰</span>
                  <span>Budget per day</span>
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <IndianRupee className="w-5 h-5 text-purple-500" />
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="500"
                      value={budget}
                      onChange={(e) => setBudget(parseInt(e.target.value))}
                      className="flex-1 h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 font-bold">
                    <span>₹500</span>
                    <span className="text-2xl font-black text-purple-600">₹{budget}</span>
                    <span>₹10,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div
                onClick={() => handleCategoryClick('hotels')}
                className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
              >
                <div className="text-center text-white">
                  <div className="text-4xl mb-3 group-hover:animate-bounce">🏨</div>
                  <h3 className="text-lg font-black mb-2">Hotels</h3>
                  <p className="text-xs opacity-90">Cozy stays that won't break the bank</p>
                </div>
              </div>

              <div
                onClick={() => handleCategoryClick('restaurants')}
                className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
              >
                <div className="text-center text-white">
                  <div className="text-4xl mb-3 group-hover:animate-bounce">🍕</div>
                  <h3 className="text-lg font-black mb-2">Food</h3>
                  <p className="text-xs opacity-90">Tasty eats & street food adventures</p>
                </div>
              </div>

              <div
                onClick={() => handleCategoryClick('attractions')}
                className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
              >
                <div className="text-center text-white">
                  <div className="text-4xl mb-3 group-hover:animate-bounce">✨</div>
                  <h3 className="text-lg font-black mb-2">Vibes</h3>
                  <p className="text-xs opacity-90">Cool spots & Insta-worthy places</p>
                </div>
              </div>

              <div
                onClick={() => navigate('/trip-planner')}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group relative overflow-hidden"
              >
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-black animate-pulse">
                    HOT 🔥
                  </span>
                </div>
                <div className="text-center text-white">
                  <div className="text-4xl mb-3 group-hover:animate-bounce">🤖</div>
                  <h3 className="text-lg font-black mb-2">AI Planner</h3>
                  <p className="text-xs opacity-90">Smart itinerary that hits different</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-gray-900 mb-6 flex items-center justify-center space-x-3">
              <span>🚀</span>
              <span>Why We're Different</span>
              <span>💯</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
              We get it - you want maximum experiences without the financial stress. That's exactly what we deliver! 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-3">Budget Friendly</h4>
              <p className="text-gray-600 font-medium">
                Every recommendation fits your wallet. No surprise costs, just pure value! 
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🔍</span>
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-3">Smart Search</h4>
              <p className="text-gray-600 font-medium">
                AI-powered recommendations that understand your vibe and preferences
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">📍</span>
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-3">Local Secrets</h4>
              <p className="text-gray-600 font-medium">
                Hidden gems and local favorites that only insiders know about
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-3">AI Magic</h4>
              <p className="text-gray-600 font-medium">
                Personalized itineraries that maximize fun while minimizing costs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Planner CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-5xl animate-bounce">🤖</span>
                <h3 className="text-4xl font-black">AI Trip Planner</h3>
                <span className="text-5xl animate-bounce delay-300">✨</span>
              </div>
              <p className="text-2xl mb-8 opacity-90 font-bold">
                Let AI create the perfect itinerary that's totally your vibe! 🔥
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
                  <span className="text-2xl">⚡</span>
                  <span className="font-bold">Instant Planning</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
                  <span className="text-2xl">🎯</span>
                  <span className="font-bold">Budget Optimized</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
                  <span className="text-2xl">🏆</span>
                  <span className="font-bold">Max Experiences</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/trip-planner')}
                className="bg-white text-purple-600 px-10 py-4 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all transform hover:scale-110 shadow-xl"
              >
                Let's Plan This! 🚀
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-black text-gray-900 mb-12 flex items-center justify-center space-x-3">
            <span>💬</span>
            <span>What Gen-Z Says</span>
            <span>🔥</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-medium">
                "This app is literally a game-changer! Found the most aesthetic cafes in Mumbai under my budget 💯"
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Arya, 21</p>
                  <p className="text-sm text-gray-600">College Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-medium">
                "The AI planner is insane! Planned my entire Goa trip in 5 minutes and saved me ₹3000 🤯"
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Rohan, 23</p>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-medium">
                "Finally an app that gets student budgets! Found amazing hostels and street food spots ✨"
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Priya, 20</p>
                  <p className="text-sm text-gray-600">Design Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;