import api from "@/app/utils/api";
import { AxiosError } from "axios";

export interface AgentApiResponse {
  success: boolean;
  text?: string;
  error?: string;
  redirectToPricing?: boolean;
}

const MAX_CHAR_LIMIT = 250;

export async function searchJobsAction(
  prompt: string
): Promise<AgentApiResponse> {
  if (!prompt || !prompt.trim()) {
    return { success: false, error: "Prompt is required for search." };
  }

  if (prompt.trim().length > MAX_CHAR_LIMIT) {
    return {
      success: false,
      error: `Prompt exceeds the maximum allowed limit of ${MAX_CHAR_LIMIT} characters.`,
    };
  }

  try {
    const { data } = await api.post<AgentApiResponse>(
      "/api/ai/agent",
      { prompt: prompt.trim(), mode: "candidate" },
      { headers: { "Content-Type": "application/json" } }
    );

    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return {
        success: false,
        error:
          err.response?.data?.error ||
          err.message ||
          "Failed to fetch AI job search results.",
        redirectToPricing: err.response?.data?.redirectToPricing || false,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while processing your request.",
    };
  }
}
