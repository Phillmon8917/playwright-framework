import axios from "axios";
import "dotenv/config";

export class AIHelper {

  /**
   * Makes a POST request to the ZeroStep AI API to get the answer to the given question.
   * The request body is a JSON object with a single property "prompt" containing the question
   * and another property "max_tokens" set to 10.
   * The response is a JSON object with a single property "choices" containing an array of
   * objects, each with a single property "text" containing the answer to the question.
   * The function returns the trimmed answer text.
   * @param {string} question - The question to get the answer for
   * @returns {Promise<string>} - A promise which resolves with the answer text
   */
  public static async getAIAnswer(question: string): Promise<string> {
    const prompt = `Answer this question directly, no explanation: ${question}`;

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
  }
}
