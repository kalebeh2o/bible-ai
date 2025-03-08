"use client";

import { createContext, useContext, useEffect, ReactNode, useState } from "react";
import { checkAuth } from "@/actions/checkAuth.actions";

const checkAuthStatus = async () => {
  try {
    const authStatus = await checkAuth(); 
    return authStatus; 
  } catch (error) {
    console.error("Erro ao verificar o status de autenticação", error);
    return false;
  }
};

interface AuthContextType {
  isAuthenticated: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus); 
    };

    initializeAuthStatus();
  }, []); 

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
