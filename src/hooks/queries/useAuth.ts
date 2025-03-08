"use client";

import { useState, useEffect } from "react";
import { checkAuth } from "@/actions/checkAuth.actions";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setLoading(true);
        const authStatus = await checkAuth();
        setIsAuthenticated(authStatus);
      } catch (err) {
        setError(new Error("Erro ao verificar autenticação"));
        console.error("Erro ao verificar autenticação:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return { loading, error, isAuthenticated };
};
