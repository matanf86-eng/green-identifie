const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// API endpoint for image analysis
app.post('/api/analyze', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'חסרה תמונה' });
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: image
            }
          },
          {
            type: 'text',
            text: `נא לנתח את התמונה ולזהות האם מדובר בכוסברה או פטרוזיליה.
            
השב במבנה JSON הבא בלבד (ללא טקסט נוסף):
{
  "plant": "כוסברה" או "פטרוזיליה" או "לא ברור",
  "confidence": מספר בין 0-100,
  "explanation": "הסבר קצר למה זיהית כך (2-3 משפטים בעברית)",
  "distinguishing_features": "תכונות מזהות שראית בתמונה"
}

אם התמונה לא מציגה כוסברה או פטרוזיליה, ציין "לא ברור" ב-plant.`
          }
        ]
      }]
    });

    // Extract and parse response
    const resultText = message.content[0].text;
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('תשובה לא תקינה מהשרת');
    }
    
    const result = JSON.parse(jsonMatch[0]);
    res.json(result);

  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      error: 'שגיאה בניתוח התמונה',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🌿 Server running on http://localhost:${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} in your browser`);
});
