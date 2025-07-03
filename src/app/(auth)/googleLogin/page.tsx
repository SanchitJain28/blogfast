import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Chrome } from "lucide-react";
import React from "react";

export default function GoogleLogin() {
  const { toast } = useToast();
  const LoginBygoogle = async () => {
    const supabase = createClient();
    try {
      const response = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/auth/callback",
        },
      });

      console.log(response);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError.response?.data);

      toast({
        title: "Login",
        description: " login un succesful ",
        className: "bg-red-500 text-black",
      });
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
