import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Building, Utensils, MapPin as Attraction, Sparkles, User, LogIn, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <MapPin className="w-4 h-4" />, emoji: '🏠' },
    { path: '/hotels', label: 'Hotels', icon: <Building className="w-4 h-4" />, emoji: '🏨' },
    { path: '/restaurants', label: 'Food', icon: <Utensils className="w-4 h-4" />, emoji: '🍕' },
    { path: '/attractions', label: 'Vibes', icon: <Attraction className="w-4 h-4" />, emoji: '✨' },
    { path: '/trip-planner', label: 'AI Planner', icon: <Sparkles className="w-4 h-4" />, emoji: '🤖' }
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 shadow-2xl sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white drop-shadow-lg">
                  Cosmo
                </h1>
                <p className="text-xs text-white/80 font-medium -mt-1">Travel Vibes ✨</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="font-bold text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Login/Profile Button */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/30">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">😎</span>
                    </div>
                    <span className="text-sm font-bold text-white hidden sm:block">Hey bestie!</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all backdrop-blur-sm border border-white/20"
                  >
                    <LogOut className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white hidden sm:block">Peace ✌️</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-2xl hover:bg-gray-100 transition-all shadow-lg font-black transform hover:scale-105"
                >
                  <span className="text-lg">🚀</span>
                  <span>Join the Vibe</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"></div>
            
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-3xl flex items-center justify-center mx-auto mb-4 transform rotate-12">
                <span className="text-3xl">🌟</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Ready to explore the world? Let's get you signed in! ✨</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address 📧
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password 🔐
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded-lg border-gray-300 text-purple-500 focus:ring-purple-500 w-5 h-5" />
                  <span className="ml-3 text-sm text-gray-600 font-medium">Remember me 💭</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-bold">
                  Forgot password? 🤔
                </a>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white py-4 rounded-2xl font-black text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Let's Go! 🚀
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                New here?{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-bold">
                  Join the squad! 🎉
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105">
                  <span className="text-2xl mr-2">🔍</span>
                  <span className="font-bold text-gray-700">Google</span>
                </button>
                <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105">
                  <span className="text-2xl mr-2">📘</span>
                  <span className="font-bold text-gray-700">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;