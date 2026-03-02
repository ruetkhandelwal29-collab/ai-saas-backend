const express = require("express");
const router = express.Router();

const ai = require("../ai/provider");

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        ok: false,
        message: "Prompt is required"
      });
    }

    const result = await ai.generateText(prompt);

    res.json({
      ok: true,
      result: result
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({
      ok: false,
      message: "AI request failed"
    });
  }
});

module.exports = router;