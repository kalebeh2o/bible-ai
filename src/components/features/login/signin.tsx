"use client";
import { checkAuth } from "@/actions/checkAuth.actions";
import { SigninCard } from "./signin-card";
import { createUserParams } from "@/core/types";
import { useSignin } from "@/hooks/queries/useSignin";
import { useRouter } from "next/navigation";
export function SigninContainer() {
  const { signin, loading, error } = useSignin();
  const route = useRouter();
  const handleSignin = async (userData: createUserParams) => {
    const response = await signin(userData);
    console.log(response);
    const auth = await checkAuth();
    if (auth) {
      route.push("/biblia");
    }
  };

  return (
    <div className="flex items-center justify-center  min-h-screen ">
      <SigninCard handleSignin={handleSignin} loading={loading} error={error} />
    </div>
  );
}
