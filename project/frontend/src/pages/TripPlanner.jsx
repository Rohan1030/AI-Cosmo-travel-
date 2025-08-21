import React, { useState } from 'react';
import { MapPin, IndianRupee, Clock, Users, Calendar, Sparkles } from 'lucide-react';

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    city: '',
    budget: 5000,
    duration: 2,
    travelers: 2,
    interests: [],
    travelStyle: 'budget',
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    'Historical Sites', 'Food & Dining', 'Shopping', 'Nightlife',
    'Nature & Parks', 'Museums', 'Adventure', 'Photography',
    'Local Culture', 'Street Food', 'Architecture', 'Spiritual'
  ];

  const travelStyles = [
    { id: 'budget', name: 'Budget Explorer', desc: 'Maximum value for money' },
    { id: 'comfort', name: 'Comfort Seeker', desc: 'Balance of comfort and cost' },
    { id: 'luxury', name: 'Luxury Traveler', desc: 'Premium experiences' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    if (!formData.city.trim()) {
      alert('Please enter a city!');
      return;
    }

    setIsGenerating(true);
    setGeneratedPlan(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: formData.city,
          budget: formData.budget,
          duration: formData.duration,
          travelers: formData.travelers,
          travelStyle: formData.travelStyle,
          interests: formData.interests
        }),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      setGeneratedPlan({
        itineraryText: data.plan.reply || data.plan.response || JSON.stringify(data.plan)
      });

    } catch (error) {
      console.error(error);
      alert('Something went wrong while generating your itinerary.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              COSMO TRAVEL
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {' '}Smart Trip Planner
              </span>
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plan smarter with COSMO TRAVEL — get a customized itinerary that fits your budget and style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-orange-500" />
              <span>Plan Your Trip</span>
            </h2>

            <div className="space-y-6">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g., Delhi, Mumbai"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Budget & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (INR)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <option key={day} value={day}>{day} {day === 1 ? 'Day' : 'Days'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.travelers}
                    onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Travel Style</label>
                <div className="grid grid-cols-1 gap-3">
                  {travelStyles.map(style => (
                    <label key={style.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="travelStyle"
                        value={style.id}
                        checked={formData.travelStyle === style.id}
                        onChange={(e) => handleInputChange('travelStyle', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 ${formData.travelStyle === style.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-sm text-gray-600">{style.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Your Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interests.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm ${formData.interests.includes(interest) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate */}
              <button
                onClick={generateItinerary}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white py-4 rounded-lg font-semibold"
              >
                {isGenerating ? 'Generating...' : 'Generate Smart Itinerary'}
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
            {!generatedPlan && !isGenerating && (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Plan?</h3>
                <p className="text-gray-600">Fill out the form to create your perfect itinerary with COSMO TRAVEL.</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Creating Your Itinerary...</h3>
              </div>
            )}

            {generatedPlan && (
              <div className="whitespace-pre-line text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: generatedPlan.itineraryText }} />
                <hr className="my-4" />
                <p className="text-sm text-gray-500 text-center">This plan is generated for you by <strong>COSMO TRAVEL</strong>. Safe travels!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
