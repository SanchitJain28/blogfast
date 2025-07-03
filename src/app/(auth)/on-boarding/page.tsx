"use client";
import { useDebounce } from "@uidotdev/usehooks";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useImageUpload } from "@/utils/ApiFunctions";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchemma } from "@/app/Schemmas/profileSchemma";

const supabase = createClient();

interface FormData {
  username: string;
  full_name: string;
  bio: string;
}

export default function OnBoarding() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      full_name: "",
      bio: "",
    },
    resolver: zodResolver(ProfileSchemma),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [isUsernameAvailable, setUsernameAvailable] = useState(true);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      // Here you would typically make an API call to create the profile
      console.log("Creating profile with data:", data);

      // Simulate API call
      const { error } = await supabase.from("profiles").insert({
        ...data,
        avatar_url: imageUrl,
        id: searchParams.get("id"),
      });

      if (error) {
        alert("Error signing you in ");
        throw error;
      }

      router.push("/");

      // Handle success (redirect, show success message, etc.)
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const {
    handleFileChange,
    isUploading,
    uploadComplete,
    uploadProgress,
    previewImage,
    imageUrl,
  } = useImageUpload();

  // Watch form values
  const watchedValues = watch();
  const bioLength = watchedValues.bio?.length || 0;
  const usernameValue = watchedValues.username?.trim() || "";

  const debouncedSearchTerm = useDebounce(usernameValue, 700);

  const checkUniqueUsername = async (username: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .limit(1); // Optional: limit to 1 for efficiency

      if (error) throw error;
      setUsernameAvailable(data.length === 0);
      // If data array is empty, username is unique
      return data.length === 0;
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      return false; // Default to false if something goes wrong
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      checkUniqueUsername(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Set up your profile to get started on your journey
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
              Profile Information
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your details to personalize your experience
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 ring-4 ring-indigo-100 shadow-lg transition-all duration-300 group-hover:ring-indigo-200">
                    <AvatarImage
                      src={previewImage || "/placeholder.svg"}
                      alt="Profile preview"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                    <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Upload className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="w-full max-w-xs">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1 text-center">
                      Uploading: {uploadProgress}%
                    </p>
                  </div>
                )}

                {uploadComplete && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm font-medium">Upload complete!</p>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    required
                    placeholder="Choose a unique username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    })}
                    className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                  />
                  {errors.username && (
                    <p className="text-xs text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                  {!isUsernameAvailable && (
                    <p className="text-xs text-red-500">
                      {"Username not available"}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    This will be your unique identifier on the platform
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="full_name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("full_name")}
                    className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                {errors.full_name && (
                  <p className="text-xs text-red-500">
                    {errors.full_name.message}
                  </p>
                )}
                {/* Avatar Upload */}
                <div className="space-y-2">
                  <Label
                    htmlFor="avatar_url"
                    className="text-sm font-medium text-gray-700"
                  >
                    Profile Picture
                  </Label>
                  <div className="relative">
                    <Input
                      id="avatar_url"
                      name="avatar_url"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border-2  border-dashed border-gray-300 hover:border-indigo-400 focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="text-sm font-medium text-gray-700"
                  >
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself... What makes you unique?"
                    {...register("bio", {
                      maxLength: {
                        value: 500,
                        message: "Bio must be less than 500 characters",
                      },
                    })}
                    className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors min-h-[120px] resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Share your story, interests, or what you are passionate
                      about
                    </p>
                    <p className="text-xs text-gray-400">{bioLength}/500</p>
                  </div>
                  {errors.bio && (
                    <p className="text-xs text-red-500">{errors.bio.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={isLoading || !usernameValue || !isUsernameAvailable}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Creating Your Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Create My Profile</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            By creating a profile, you agree to our{" "}
            <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
              terms of service
            </span>{" "}
            and{" "}
            <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
              privacy policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
