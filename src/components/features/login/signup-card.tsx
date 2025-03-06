"use client";  

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Church } from "lucide-react"; 
import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";  
import { createUserParams } from "@/core/types"; 
import { PasswordInput } from "../../ui/password-input";

interface SignupCardProps {
  handleSignup: (userData: createUserParams) => void; 
  loading: boolean;
  error: Error | null;
}

export function SignupCard({ handleSignup, loading, error }: SignupCardProps) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup({ phone, email, password });
  };

  return (
    <Card className="w-full max-w-sm shadow-lg border border-gray-200 bg-white lg:bg-transparent">
      <CardHeader className="flex flex-col items-center">
        <Church className="w-12 h-12 text-gray-800 bg-text-gray-800" />
        <CardTitle className="text-center text-gray-800 text-xl mt-2">
          Faça seu cadastro
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1 italic text-center">
          "O Senhor é a minha luz e a minha salvação." <br />Salmos 27:1
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <PhoneInput setPhone={setPhone} />

          <Input
            type="email"
            placeholder="E-mail"
            className="bg-white border-gray-300 text-gray-800"
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
            {loading ? "Cadastrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
