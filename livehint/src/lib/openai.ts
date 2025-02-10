export const getAIResponse = async (prompt: string) => {
  try {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.response;
  } catch (error) {
    console.error("❌ Fetch API error:", error);
    return "⚠️ AI response error";
  }
};
