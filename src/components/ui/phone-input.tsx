"use client"
import { useEffect, useRef } from "react";
import { Input } from "./input";
import Inputmask from "inputmask";  

export function PhoneInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      Inputmask("(99) 99999-9999").mask(inputRef.current);
    }
  }, []);

  return (
    <Input
      ref={inputRef}
      type="tel"
      placeholder="Telefone"
      className="bg-white border-gray-300 text-gray-800"
      required
    />
  );
}