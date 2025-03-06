"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

interface CoreProviderProps {
  children: ReactNode;
}

export const CoreProvider = ({ children }: CoreProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
