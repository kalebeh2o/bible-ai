"use client";

import { useState } from "react";
import { getAiExplanation } from "@/actions/explanation.actions";

export const useExplanation = () => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getExplanation = async (verseText: string) => {
    try {
      setLoading(true);
      const explanationData = await getAiExplanation(verseText);
      setExplanation(explanationData);
      return explanationData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar explicação";
      setError(new Error(errorMessage));
      console.error("Erro ao buscar explicação:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearExplanation = () => {
    setExplanation(null);
    setError(null);
  };

  return {
    explanation,
    loading,
    error,
    getExplanation,
    clearExplanation,
  };
};
