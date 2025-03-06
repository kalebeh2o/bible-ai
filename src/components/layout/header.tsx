"use client";

import { ReactNode, useState } from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background border-b border-accent  py-2 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-foreground">Bíblia AI</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {children}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Menu"
              className="ml-1"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 py-3" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-3 items-center">{children}</div>
        </div>
      </div>
    </header>
  );
};
