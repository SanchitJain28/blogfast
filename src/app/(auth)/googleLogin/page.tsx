"use client";

import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { Chrome } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

export default function GoogleLogin() {
  const LoginBygoogle = async () => {
    const supabase = createClient();
    try {
      const response = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://blogfast-phi.vercel.app/auth/callback",
        },
      });

      console.log(response);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError.response?.data);

      toast(" login un-successful ");
    }
  };
  return (
    <div>
      <Button
        type="button"
        variant="outline"
        className="w-full bg-transparent"
        onClick={LoginBygoogle}
      >
        <Chrome className="h-4 w-4 mr-2" />
        Continue with Google
      </Button>
    </div>
  );
}
