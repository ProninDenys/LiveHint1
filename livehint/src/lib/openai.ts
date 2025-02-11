import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true, 
});

let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 3;

export const getAIResponse = async (prompt: string) => {
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    return "⚠️ Too many requests! Try again later.";
  }

  requestCount++;
  setTimeout(() => requestCount--, 60000); // Каждую минуту сбрасываем счетчик

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "⚠️ AI response error. Please try again later.";
  }
};
