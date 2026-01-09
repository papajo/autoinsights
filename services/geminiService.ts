
import { GoogleGenAI } from "@google/genai";

/**
 * Standardizing Gemini API initialization and call structure.
 * Using process.env.API_KEY directly and avoiding maxOutputTokens without thinkingBudget.
 */
export const getMarketInsights = async (dataSummary: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze the following automotive market data summary and provide 3 key intelligent insights.
        Focus on trends, market dominance, and potential future outlook. 
        Keep the response concise and professional.
        
        Data Summary:
        ${dataSummary}
      `,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "Unable to fetch AI insights at this moment. Please check your connectivity and API configuration.";
  }
};
