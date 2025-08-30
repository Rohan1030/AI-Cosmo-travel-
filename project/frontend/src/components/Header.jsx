import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MapPin,
  Building,
  Utensils,
  MapPin as Attraction,
  Sparkles,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "../supabaseclient.js"; // import supabase client



const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState(null); // supabase user
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);


  // Fetch user on load
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // handle login
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      setShowLoginModal(false);
    }
  };

  // handle signup
  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm your account!");
    }
  };

  // handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { path: "/", label: "Home", emoji: "🏠" },
    { path: "/hotels", label: "Hotels", emoji: "🏨" },
    { path: "/restaurants", label: "Food", emoji: "🍕" },
    { path: "/attractions", label: "Vibes", emoji: "✨" },
    { path: "/trip-planner", label: "AI Planner", emoji: "🤖" },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 shadow-2xl sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white drop-shadow-lg">
                  Cosmo
                </h1>
                <p className="text-xs text-white/80 font-medium -mt-1">
                  Travel Vibes ✨
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all ${
                    location.pathname === item.path
                      ? "bg-white/20 text-white shadow-lg border border-white/30"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="font-bold text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                // Logged in
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-2xl border border-white/30">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">😎</span>
                    </div>
                    <span className="text-sm font-bold text-white hidden sm:block">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20"
                  >
                    <LogOut className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white hidden sm:block">
                      Logout
                    </span>
                  </button>
                </div>
              ) : (
                // Logged out
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-2xl hover:bg-gray-100 shadow-lg font-black"
                >
                  <span className="text-lg">🚀</span>
                  <span>Join the Vibe</span>
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
      {/* close */}
      <button
        onClick={() => setShowLoginModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Toggle between login / signup */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-6 py-2 font-bold rounded-l-xl transition-all ${
            isLogin
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-6 py-2 font-bold rounded-r-xl transition-all ${
            !isLogin
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Welcome Back! 👋" : "Join the Vibe 🎉"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 mb-3 border rounded-lg"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 mb-3 border rounded-lg"
        onChange={(e) => setPassword(e.target.value)}
      />

      {isLogin ? (
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg shadow-lg font-bold transition-all"
        >
          Login 🚀
        </button>
      ) : (
        <button
          onClick={handleSignup}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg shadow-lg font-bold transition-all"
        >
          Sign Up ✨
        </button>
      )}
    </div>
  </div>
)}

    </>
  );
};

export default Header;
