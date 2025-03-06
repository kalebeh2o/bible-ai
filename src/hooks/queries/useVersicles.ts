"use client";

import { useState, useEffect } from "react";
import { Versicle } from "@/core/types/entities";
import { getVersicles } from "@/actions/versicle.actions";

export const useVersicles = (
  version: string,
  chapter: string,
  book: string
) => {
  const [versicles, setVersicles] = useState<Versicle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVersicles = async () => {
      if (!version || !chapter || !book) return;

      try {
        setLoading(true);
        const versiclesData = await getVersicles(version, chapter, book);
        setVersicles(versiclesData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Erro ao buscar os versículos")
        );
        console.error("Erro ao buscar versículos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVersicles();
  }, [version, chapter, book]);

  return { versicles, loading, error };
};
