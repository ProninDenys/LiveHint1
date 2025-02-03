import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Загружаем ключ из env
  dangerouslyAllowBrowser: true, // Разрешаем вызов API с фронта
});

export async function getAIResponse(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // или "gpt-4"
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "⚠️ AI response error (Check API Key)";
  }
}
