"use client";  

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Church } from "lucide-react"; 
import { useState } from "react";
import { createUserParams } from "@/core/types"; 
import { PasswordInput } from "../../ui/password-input";
import Link from "next/link";  // Importando o componente Link para navegação

interface SigninCardProps {
  handleSignin: (userData: createUserParams) => void; 
  loading: boolean;
  error: Error | null;
}

export function SigninCard({ handleSignin, loading, error }: SigninCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignin({ email, password });
  };

  return (
    <Card className="w-full max-w-sm shadow-lg border lg:bg-transparent">
      <CardHeader className="flex flex-col items-center">
        <Church className="w-12 h-12 bg-text-gray-800" />
        <CardTitle className="text-center text-xl mt-2">
          Faça seu login
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1 italic text-center">
          "O Senhor é a minha luz e a minha salvação." <br />Salmos 27:1
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>

          <Input
            type="email"
            placeholder="E-mail"
            className="border-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput setPassword={setPassword} /> 

          {error && <p className="text-red-500 text-sm">{error.message}</p>}

          <Button 
            type="submit" 
            className="w-full bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/cadastro" className="text-sm text-blue-600 hover:underline">
            Ainda não tenho uma conta
          </Link>
        </div>

        <div className="mt-2 text-center">
          {/* <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Esqueci minha senha
          </Link> */}
        </div>
      </CardContent>
    </Card>
  );
}
