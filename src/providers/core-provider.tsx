"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
interface CoreProviderProps {
  children: ReactNode;
}

export const CoreProvider = ({ children }: CoreProviderProps) => {
  return <AuthProvider><ThemeProvider>{children}</ThemeProvider></AuthProvider>;
};
