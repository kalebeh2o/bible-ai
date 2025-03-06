import { Session, User, WeakPassword } from "@supabase/supabase-js";

export interface UserData{
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
  }