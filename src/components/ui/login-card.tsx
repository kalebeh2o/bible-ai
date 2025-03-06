"use client";  
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Eye, EyeOff } from "lucide-react"; 
import { useState, } from "react";
import { PhoneInput } from "@/components/ui/phone-input";  

export function LoginCard() {
  return (
      <Card className="w-full max-w-sm shadow-lg border border-gray-200 bg-white lg:bg-transparent">
        <CardHeader className="flex flex-col items-center">
          <Church className="w-12 h-12 text-gray-800 bg-text-gray-800" />
          <CardTitle className="text-center text-gray-800 text-xl mt-2">
            Faça login
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1 italic text-center">
            "O Senhor é a minha luz e a minha salvação." <br />Salmos 27:1
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <PhoneInput />

            <Input
              type="email"
              placeholder="E-mail"
              className="bg-white border-gray-300 text-gray-800"
              required
            />

            <PasswordInput />

            <Button className="w-full bg-gray-800 text-white hover:bg-gray-900">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Senha"
        className="bg-white border-gray-300 text-gray-800 pr-10"
        required
        minLength={6}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
