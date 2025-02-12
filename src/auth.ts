import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createClient } from "./app/utils/supabase/server"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const supabase = await createClient();
      // Check if user exists in Supabase
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();
        console.log(data)

      if (!data) {
        // If user does not exist, insert into Supabase
      const data=  await supabase.from("users").insert([
          {
            email: user.email,
            name: user.name,
            avatar: user.image,
          },
        ]);
        console.log(data)
      }

      return true; // Allow sign-in
    },
  }
},
)