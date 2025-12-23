
import { GoogleGenAI, Type } from "@google/genai";
import { HistoryInsight } from "../types";

export const getGeminiInsight = async (topic: string): Promise<HistoryInsight | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Phân tích sâu về ý nghĩa lịch sử của chủ đề này trong bối cảnh Đổi Mới 1986 tại Việt Nam: "${topic}". Cung cấp thông tin ngắn gọn nhưng sâu sắc.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            significance: { type: Type.STRING }
          },
          required: ["title", "content", "significance"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as HistoryInsight;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
  return null;
};
