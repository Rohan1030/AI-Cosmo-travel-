import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import Attractions from './pages/Attractions';
import TripPlanner from './pages/TripPlanner';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;