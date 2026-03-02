const { generateText: gemini } = require("./gemini");
const { generateText: mock } = require("./mock");

function generateText(prompt) {
  const provider = process.env.AI_PROVIDER || "gemini";

  if (provider === "mock") return mock(prompt);
  if (provider === "gemini") return gemini(prompt);

  throw new Error("Invalid AI provider");
}

module.exports = { generateText };