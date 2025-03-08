import { createClient } from "@/utils/server";
import { createUserParams } from "@/core/types";
import { UserResponse } from "@/core/types";

export const auth = {
  signup: async (user: createUserParams): Promise<UserResponse> => {
    try {
      const supabase = await createClient();

      const { email, password, phone } = user; 
      console.log(user)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone
      });

      if (error) {
        throw new Error(error.message);
      }

      return { data, status: 200 }; 
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      throw error;
    }
  },

  signin: async (user: createUserParams): Promise<UserResponse> => {
    try {
      const supabase = await createClient();

      const { email, password } = user; 
      console.log(user)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return { data, status: 200 }; 
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      throw error;
    }
  },
};
