const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'חסרה תמונה' });
    }

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
            text: 'נא לנתח את התמונה ולזהות האם מדובר בכוסברה או פטרוזיליה.\n\nהשב במבנה JSON הבא בלבד (ללא טקסט נוסף):\n{\n  "plant": "כוסברה" או "פטרוזיליה" או "לא ברור",\n  "confidence": מספר בין 0-100,\n  "explanation": "הסבר קצר למה זיהית כך (2-3 משפטים בעברית)",\n  "distinguishing_features": "תכונות מזהות שראית בתמונה"\n}\n\nאם התמונה לא מציגה כוסברה או פטרוזיליה, ציין "לא ברור" ב-plant.'
          }
        ]
      }]
    });

    const resultText = message.content[0].text;
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('תשובה לא תקינה מהשרת');
    }
    
    const result = JSON.parse(jsonMatch[0]);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      error: 'שגיאה בניתוח התמונה',
      details: error.message 
    });
  }
};
