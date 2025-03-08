"use client";

import { useState } from "react";
import { SignupCard } from "@/components/features/cadastro/signup-card";  
import { ConfirmEmailCard } from "./confirm-email-card";
import { createUserParams } from "@/core/types"; 
import { useSignup } from "@/hooks/queries/useSignup";

export function SignupContainer() {
  const { signup, loading, error, success } = useSignup();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleSignup = async (userData: createUserParams) => {
    const response = await signup(userData);

    if (response) {
      setUserEmail(userData.email);
    }
  };

  return (
    <div className="flex items-center justify-center  min-h-screen ">
      {success && userEmail ? (
        <ConfirmEmailCard email={userEmail} />
      ) : (
        <SignupCard handleSignup={handleSignup} loading={loading} error={error} />
      )}
    </div>
  );
}
