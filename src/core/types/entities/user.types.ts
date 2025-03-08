import { Session, User } from "@supabase/supabase-js";

export interface UserData {
  user: User | null;
  session: Session | null;
}
