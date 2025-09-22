import express from "express";
import axios from "axios";
const router = express.Router();

// Claude-style system prompt
const systemPrompt = `You are a world-class AI chatbot... [Use the full prompt here from earlier]`;

router.get("/", (req, res) => {
  res.render("index.njk", { response: null });
});

router.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://chatgpt-42.p.rapidapi.com/conversationgpt4",
      {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    const result = response.data.result || "No reply from API";
    res.render("index.njk", { response: result });

  } catch (err) {
    console.error("API error:", err.message);
    res.render("index.njk", { response: "⚠️ Error fetching response." });
  }
});

export default router;
