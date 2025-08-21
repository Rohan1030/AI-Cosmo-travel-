import React from 'react';
import { MapPin, Instagram, Twitter, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h3 className="text-2xl font-black">Cosmo Travel</h3>
                <p className="text-sm text-white/70 font-medium">Travel Vibes ✨</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 text-lg font-medium max-w-md">
              Empowering Gen-Z travelers to explore the world without breaking the bank! 
              Maximum vibes, minimum coins 💰✨
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all transform hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black mb-6 flex items-center space-x-2">
              <span>🔗</span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">🏠 Home</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">🏨 Hotels</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">🍕 Food</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">✨ Vibes</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">🤖 AI Planner</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black mb-6 flex items-center space-x-2">
              <span>💬</span>
              <span>Support</span>
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">❓ Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">📞 Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">🔒 Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">📋 Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors font-medium">🍪 Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 mb-4 md:mb-0 font-medium">
              © 2025 Cosmo Travel. Made with <Heart className="w-4 h-4 inline text-red-400" /> for Gen-Z explorers.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-white/60 font-medium">🌍 Available in 50+ cities</span>
              <span className="text-white/60 font-medium">💯 Trusted by 10K+ travelers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;