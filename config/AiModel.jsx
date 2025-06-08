import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GENAI_API_KEY;

if (!apiKey) {
  throw new Error("Google Generative AI API key is missing. Check your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-05-20",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

// ✅ export functions instead of shared chat objects
export async function GenerateTopicsAIResponse(prompt) {
  const chat = await model.startChat({ generationConfig });
  return await chat.sendMessage(prompt);
}

export async function GenerateCourseAIResponse(prompt) {
  const chat = await model.startChat({ generationConfig });
  return await chat.sendMessage(prompt);
}


