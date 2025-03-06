"use client";

import { ReactNode } from "react";
import { ThemeToggle } from "../ui/theme-toggle";

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border py-3 px-4 flex justify-between items-center">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xl font-bold text-foreground">Bíblia AI</div>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
