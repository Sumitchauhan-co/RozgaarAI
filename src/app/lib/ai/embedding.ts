import OpenAI from "openai";

const prod = process.env.NODE_ENV === "production";

const openai = new OpenAI({
  baseURL: prod ? "https://openrouter.ai/api/v1" : "http://localhost:11434/v1",
  apiKey: prod ? process.env.OPENROUTER_API_KEY : "ollama",
});

export async function createEmbedding(text: string): Promise<number[]> {
  const modelName = prod ? "text-embedding-3-small" : "qwen3-embedding";

  const response = await openai.embeddings.create({
    model: modelName,
    input: text.replace(/\n/g, " "),
    dimensions: 1536,
  });

  return response.data[0].embedding;
}
