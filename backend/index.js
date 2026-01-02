import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.LLM_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error("🔥 Gemini error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => console.log(" BACKEND RUNNING "));
