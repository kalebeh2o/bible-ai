"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LoginHeader = () => {
  const router = useRouter();

  return (
    <header className="bg-background border-b border-accent py-1 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Acesse sua conta ou cadastre-se para explorar a Palavra de Deus!
            </span>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/cadastro")}>
              Cadastro
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
