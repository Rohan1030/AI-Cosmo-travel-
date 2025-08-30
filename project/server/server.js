import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


// AI Powered travel planner

app.post('/api/generate-itinerary', async (req, res) => {
  const { city, budget, duration, travelers, travelStyle, interests } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }



const message = `
You are COSMO TRAVEL AI — a professional, friendly trip planner.
Create a detailed daily itinerary for the following request:
- City: ${city}
- Budget: ₹${budget}
- Duration: ${duration} days
- Travelers: ${travelers}
- Travel Style: ${travelStyle}
- Interests: ${interests.join(', ')}

✅ **Formatting instructions**:
- Wrap the entire response in a single <div> with: style="font-family: Arial, sans-serif; line-height: 1.5;"
- Start with: <h1><strong>COSMO TRAVEL</strong></h1>
- Then add the day-wise plan:
   • Use <h2> for each day (e.g., Day 1: Exploring [City Name])  
   • Use <h3> for time blocks (Morning, Midday, Afternoon, Evening)  
   • Use bullet points with <ul><li> and **bold** times & costs.
- Add local tips if useful.
- Include a <h2>Total Cost</h2> section.
- End with:
"<br><br>✅ This trip plan was crafted for you by <strong>COSMO TRAVEL</strong> — Have a safe & memorable journey!"

✅ Output **only valid raw HTML** — no extra text, no code block markers, no plain text above the HTML.
`;





// Lyzr api to display attraction.


  try {
    const response = await axios.post(
      'https://agent-prod.studio.lyzr.ai/v3/inference/chat/',
      {
        user_id: "rkrk02233@gmail.com",
        agent_id: process.env.LYZR_AGENT_ID,
        session_id: `${process.env.LYZR_AGENT_ID}-session-1`,
        message: message
      },
      {
        headers: {
          'x-api-key': process.env.LYZR_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("✅ Lyzr API response:", response.data);
    res.json({ plan: response.data });

  } catch (error) {
    console.error("❌ Lyzr API error:", error.response?.data || error.message);
    res.status(500).json({
      error: 'Something went wrong with Lyzr API',
      details: error.response?.data || error.message
    });
  }
});


// Attraction


app.post('/api/explore-places', async (req, res) => {
  const { city, budget } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // 1️⃣ Get coordinates
    const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=YOUR_TEXT&format=json&apiKey=eab089c330054a6da357cc4c7fe683ca`, {
      params: {
        name: city,
        apikey: process.env.OPENTRIPMAP_API_KEY,
      },
    });

    const { lat, lon } = geoResponse.data;

    if (!lat || !lon) {
      return res.status(404).json({ error: `Could not find coordinates for ${city}` });
    }

    // 2️⃣ Get places near coordinates
    const placesResponse = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=YOUR_TEXT&format=json&apiKey=eab089c330054a6da357cc4c7fe683ca`, {
      params: {
        radius: 5000,
        lon,
        lat,
        rate: 2,
        limit: 20,
        apikey: process.env.OPENTRIPMAP_API_KEY,
      },
    });

    const features = placesResponse.data.features;

    const places = features.map((f) => ({
      xid: f.properties.xid,
      name: f.properties.name,
      kinds: f.properties.kinds,
      dist_meters: f.properties.dist,
    }));

    return res.json({ places });

  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.response?.data || error.message,
    });
  }
});










app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
