import { OpenRouter } from "@openrouter/agent";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY environment variable");
}

export const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});
