"use client";

import { useState, useEffect } from "react";
import { Version } from "@/core/types/entities";
import { getVersions } from "@/actions/version.actions";

export const useVersions = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        setLoading(true);
        const versionsData = await getVersions();
        setVersions(versionsData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Erro ao buscar as versões")
        );
        console.error("Erro ao buscar as versões:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  return { versions, loading, error };
};
