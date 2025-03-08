"use client";

import { useState } from "react";
import { SigninCard } from "./signin-card";
import { createUserParams } from "@/core/types"; 
import { useSignin } from "@/hooks/queries/useSignin";

export function SigninContainer() {
  const { signin, loading, error, success } = useSignin();

  const handleSignin = async (userData: createUserParams) => {
    const response = await signin(userData);
    console.log(response)
  };

  return (
    <div className="flex items-center justify-center  min-h-screen ">

        <SigninCard handleSignin={handleSignin} loading={loading} error={error} />

    </div>
  );
}
