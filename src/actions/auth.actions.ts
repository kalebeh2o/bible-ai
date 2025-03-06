"use server";

import { LoginService } from "@/services/auth.service";
import { UserResponse, createUserParams } from "@/core/types";

export  const authSignup = async (user: createUserParams): Promise<UserResponse> => {
  return await LoginService.signin(user);
};
