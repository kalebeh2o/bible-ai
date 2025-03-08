"use server";

import { auth } from "@/services/auth.service";
import { UserResponse, createUserParams } from "@/core/types";

export  const authSignin = async (user: createUserParams): Promise<UserResponse> => {
  return await auth.signin(user);
};
