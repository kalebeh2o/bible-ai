"use client";

import { useState } from "react";
import { createUserParams, UserResponse } from "@/core/types";
import { authSignin } from "@/actions/signin.actions";

export const useSignin = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const signin = async (credentials: createUserParams) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await authSignin(credentials);
      
      if (!response) {
        throw new Error("Falha ao autenticar. Verifique suas credenciais.");
      }

      setUser(response);
      setSuccess(true);
      return response;
    } catch (err) {

        setError(err instanceof Error ? err : new Error("Erro no Login"));
            console.error("Erro no cadastro:", err);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, success, signin };
};
