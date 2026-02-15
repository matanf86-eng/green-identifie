# 🌿 זהה את הירוק - Green Identifier

אפליקציה לזיהוי כוסברה מול פטרוזיליה באמצעות AI של Claude.

**Application for identifying cilantro vs parsley using Claude AI.**

<div align="center">

![Demo](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

## 📱 מה זה?

הבעיה הישראלית הכי מוכרת - **איך מבדלים בין כוסברה לפטרוזיליה?**

זהה את הירוק פותרת את הבעיה עם טכנולוגיית AI מתקדמת:
- 📸 צלם תמונה של העשב
- 🤖 AI של Claude מזהה מה זה
- ✅ קבל תשובה מפורטת בעברית

## ✨ תכונות

- ✅ מסך splash אנימציה מגניב
- ✅ ממשק בעברית מלא (RTL)
- ✅ גישה למצלמה + צילום
- ✅ זיהוי AI מדויק עם Claude Vision
- ✅ הסבר מפורט על התוצאה
- ✅ עיצוב מודרני ונעים לעין
- ✅ Progressive Web App (PWA)

## 🚀 התקנה מהירה

### דרישות מקדימות

- Node.js (גרסה 16 ומעלה)
- API Key של Anthropic ([קבל כאן](https://console.anthropic.com/settings/keys))

### שלבים

1. **שכפל את הפרויקט:**
```bash
git clone <repository-url>
cd green-identifier
```

2. **התקן תלויות:**
```bash
npm install
```

3. **הגדר API Key:**
```bash
# העתק את קובץ הדוגמה
cp .env.example .env

# ערוך את .env והוסף את ה-API Key שלך
# ANTHROPIC_API_KEY=sk-ant-xxxxx
```

4. **הרץ את השרת:**
```bash
npm start
```

5. **פתח בדפדפן:**
```
http://localhost:3000
```

## 📂 מבנה הפרויקט

```
green-identifier/
├── api/
│   └── server.js          # Backend server
├── public/
│   └── index.html         # Frontend app
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
└── README.md             # This file
```

## 🛠️ פיתוח

להרצה עם auto-reload:

```bash
npm run dev
```

## 📱 שימוש בטלפון

### אפשרות 1: Local Network
1. מצא את כתובת ה-IP שלך:
   - Mac/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`
2. פתח בטלפון: `http://YOUR_IP:3000`

### אפשרות 2: Deploy לאונליין
Deploy בקלות ל:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **Heroku**: `git push heroku main`
- **Railway**: חבר את ה-GitHub repo

## 🔧 הגדרות

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Anthropic API key (required) | - |
| `PORT` | Server port | 3000 |

## 🧪 API Endpoints

### POST `/api/analyze`
Analyze an image to identify cilantro or parsley.

**Request:**
```json
{
  "image": "base64_encoded_image_data"
}
```

**Response:**
```json
{
  "plant": "כוסברה",
  "confidence": 95,
  "explanation": "זוהתה כוסברה על פי...",
  "distinguishing_features": "עלים מעוגלים וריח חזק..."
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 🎨 טכנולוגיות

### Frontend
- HTML5
- CSS3 (Animations & Gradients)
- Vanilla JavaScript
- Camera API
- Canvas API

### Backend
- Node.js
- Express.js
- Anthropic Claude API (Vision)
- dotenv

## 🤔 איך זה עובד?

1. **צילום** - המשתמש מצלם תמונה של העשב
2. **העברה לשרת** - התמונה נשלחת כ-base64 לשרת
3. **ניתוח AI** - השרת שולח את התמונה ל-Claude Vision API
4. **זיהוי** - Claude מנתח את התמונה ומזהה מאפיינים ייחודיים
5. **תוצאה** - המשתמש מקבל תשובה מפורטת בעברית

## 📝 טיפים לזיהוי מוצלח

- 💡 צלמו במקום מואר
- 🔍 הקרבו את העלים למצלמה
- 🌿 נסו להראות מספר עלים
- 📷 וודאו שהתמונה חדה

## 🐛 Troubleshooting

### המצלמה לא נפתחת
- ודאו שנתתם הרשאה לדפדפן לגשת למצלמה
- ב-iOS Safari, המצלמה עובדת רק ב-HTTPS (למעט localhost)

### השרת לא עובד
```bash
# בדקו שה-API Key מוגדר
echo $ANTHROPIC_API_KEY

# בדקו שהפורט פנוי
lsof -i :3000
```

### שגיאות API
- ודאו שה-API Key תקף
- בדקו שיש לכם מספיק קרדיט ב-Anthropic

## 📄 רישיון

MIT License - ראו קובץ LICENSE לפרטים

## 🙏 תודות

- Anthropic Claude API
- הקהילה הישראלית שסובלת מהבעיה הזו כל יום 😄

## 🤝 תרומה

Pull requests מתקבלים בברכה! 

---

**נוצר עם ❤️ ו-AI**

