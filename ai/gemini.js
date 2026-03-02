const fetch = require("node-fetch");

async function generateText(prompt) {
  const finalPrompt = `
You are an AI assistant for college students.
Explain concepts clearly in simple words.
Be concise.
Avoid long stories or analogies unless explicitly asked.

User question:
${prompt}
`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: finalPrompt
              }
            ]
          }
        ]
      })
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

module.exports = { generateText };