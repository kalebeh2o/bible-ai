"use client";

import { useState } from "react";
import { createUserParams, UserResponse } from "@/core/types";
import { authSignup } from "@/actions/auth.actions";

export const useSignup = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const signup = async (credentials: createUserParams) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await authSignup(credentials);
      
      if (!response) {
        throw new Error("Falha ao autenticar. Verifique suas credenciais.");
      }

      setUser(response);
      setSuccess(true);
      return response;
    } catch (err) {
      if (err instanceof Error && err.message.includes('duplicate key value violates unique constraint')) {
        setError(new Error("Este e-mail já está em uso. Tente outro."));
      } else {
        setError(err instanceof Error ? err : new Error("Erro no Cadastro"));
      }
      console.error("Erro no cadastro:", err);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, success, signup };
};
