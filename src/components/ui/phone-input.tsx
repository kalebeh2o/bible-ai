"use client";
import { useEffect, useRef } from "react";
import { Input } from "./input";
import Inputmask from "inputmask";  

interface PhoneInputProps {
  setPhone: (phone: string) => void;
}

export function PhoneInput({ setPhone }: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      Inputmask("(99) 99999-9999").mask(inputRef.current);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanPhone = e.target.value.replace(/\D/g, ""); 
    setPhone(cleanPhone); 
  };

  return (
    <Input
      ref={inputRef}
      type="tel"
      placeholder="Telefone"
      className="bg-white border-gray-300 text-gray-800"
      required
      onChange={handleChange}  // Chamando a função handleChange quando o valor do input mudar
    />
  );
}
