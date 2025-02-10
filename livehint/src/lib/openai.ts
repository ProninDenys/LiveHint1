import { OpenAI } from "openai";
console.log("🔍 OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true, 
});

export const getAIResponse = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "⚠️ AI response error";
  }
};
