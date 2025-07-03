"use client";

import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { createClient } from "@/app/utils/supabase/client";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

// Define the shape of the AuthContext
type AuthContextType = {
  user: User | null;
};

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Supabase client instance
const supabase = createClient();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log("Auth change:", event, session);
        switch (event) {
          case "SIGNED_IN":
          case "INITIAL_SESSION":
            setUser(session?.user || null);
            break;
          case "SIGNED_OUT":
            setUser(null);
            break;
          case "USER_UPDATED":
          case "TOKEN_REFRESHED":
          case "PASSWORD_RECOVERY":
            // Handle other events if needed
            break;
        }
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

// Optional: Custom hook to use AuthContext safely
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
