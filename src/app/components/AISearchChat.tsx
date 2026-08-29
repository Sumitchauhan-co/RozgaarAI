import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import api from "../utils/api";

// 1. Define response and payload Types
interface SearchResult {
  id: string;
  title: string;
  snippet: string;
}

interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
}

interface SearchPayload {
  query: string;
}

export const AiSearchChat: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Ref to hold the AbortController for request cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Cancel any ongoing request before making a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      // 2. Perform POST query request
      const response = await api.post<SearchResponse>(
        "/api/ai-search",
        { query } as SearchPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      );

      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else if (axios.isAxiosError(err)) {
        // Handle server-side errors (4xx, 5xx)
        const errorMessage =
          err.response?.data?.message || err.message || "Search request failed";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Cleanup pending requests on component unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-xl p-4">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask or search..."
          className="flex-1 rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      {data && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Found {data.totalResults} results
          </p>
          {data.results.map(item => (
            <div key={item.id} className="rounded-md border p-3">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
