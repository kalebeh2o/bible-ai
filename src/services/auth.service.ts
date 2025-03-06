import { createClient } from "@/utils/server";
import { createUserParams } from "@/core/types";
import { UserResponse } from "@/core/types";

export const LoginService = {
  signin: async (user: createUserParams): Promise<UserResponse> => {
    try {
      const supabase = await createClient();

      const { email, password, phone } = user; 

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        phone
      });

      if (error) {
        throw new Error(error.message);
      }

      return { data, status: 200 }; 
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },
};
