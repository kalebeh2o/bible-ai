"use server";

import { auth } from "@/services/auth.service";
export  const checkAuth = async (): Promise<boolean> => {
  return await auth.isLoggedIn();
};
