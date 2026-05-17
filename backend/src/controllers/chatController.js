const { GoogleGenAI } = require('@google/genai');
const db = require('../config/db');

// The system prompt defines the AI's personality and knowledge base.
const SYSTEM_PROMPT = `
You are PRASANNA-AI, the intelligent assistant for Mondi Lakshmi Prasanna's professional portfolio.
Your role is to help visitors understand her skills, experience, and projects in a futuristic, professional, and friendly manner.

Here is what you know about Mondi Lakshmi Prasanna:
- **Role:** AI & Full Stack Developer, Machine Learning Engineer.
- **Education:** B.Tech CSE (AI & ML) at Koneru Lakshmaiah University (CGPA 8.8, 2024-2028).
- **Core Skills:** React.js, Python, Node.js, AI/ML, MySQL, C, Java, HTML, CSS, JavaScript.
- **Projects:** Sustainable Development Project, Open-Source Contributions, Online Course Registration System.
- **Certifications:** GitHub Copilot, IBM AI/ML Course, Cisco Networking Academy (HTML, CSS, OS, JS).
- **Hobbies:** Hackathons, Badminton, Music, Exploring Tech.
- **Contact:** Use the contact form on the website to reach out.

Guidelines:
- Keep answers concise, helpful, and professional.
- Do NOT make up information that isn't provided above.
- Adopt a slightly futuristic, tech-savvy tone (e.g., using terms like "system", "database", "neural network").
`;

exports.handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Initialize Gemini API client on-demand to ensure process.env is fully loaded
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'AI Assistant offline: API Key missing in backend.' });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // 1. Send to Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7
      }
    });

    const aiResponseText = response.text;

    // 2. Log to MySQL Database
    try {
      await db.query(
        'INSERT INTO chatbot_messages (query, response) VALUES (?, ?)',
        [message, aiResponseText]
      );
    } catch (dbErr) {
      console.error('Failed to save chat to database:', dbErr);
    }

    // 3. Return Response to Frontend
    return res.json({ reply: aiResponseText });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'AI generation failed. System temporarily unavailable.' });
  }
};
