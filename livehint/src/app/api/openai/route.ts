import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
    return NextResponse.json({ response: "⚠️ AI response error" }, { status: 500 });
  }
}
