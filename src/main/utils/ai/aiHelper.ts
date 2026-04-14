import axios from "axios";
import "dotenv/config";
import { logger } from "../logger/logger.ts";

export class AIHelper {
 
  /**
   * Gets an answer from the ZeroStep AI API for a given question.
   * The AI will attempt to answer the question directly, without any explanation.
   * If the API call fails, it will return "AI answer unavailable".
   * @param {string} question - The question to ask the AI.
   * @returns {Promise<string>} - A promise which resolves with the AI's answer.
   */
  public static async getAIAnswer(question: string): Promise<string> {
    const prompt = `Answer this question directly, no explanation: ${question}`;

    try {
      const response = await axios.post(
        "https://api.zerostep.ai/v1/completions",
        {
          prompt,
          max_tokens: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.ZERO_STEP_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data.choices[0].text.trim();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error("❌ ZeroStep failed: " + msg);

      return "AI answer unavailable";
    }
  }

  /**
   * Analyzes a Playwright test failure and returns an AI-generated suggestion
   * for how to fix it.
   * @param {object} data - An object containing the error message and the HTML of the page.
   * @returns {Promise<string>} - A promise which resolves with an AI-generated suggestion for how to fix the failure.
   */
  public static async analyzeFailure(data: {
    error: string;
    html: string;
  }): Promise<string> {
    const prompt = `
You are a Playwright testing expert.

Analyze this failure and respond with:
1. Why it failed
2. A better locator
3. How to fix it

ERROR:
${data.error}

HTML:
${data.html.slice(0, 3000)}
`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1024 },
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      return response.data.candidates[0].content.parts[0].text.trim();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error("❌ Gemini failed: " + msg);

      return `
AI analysis failed.

Reason: ${data.error}

Suggestion:
- Check locator
- Use Playwright trace viewer
- Verify element exists in DOM
`;
    }
  }
}
