"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState, useCallback, useEffect } from "react";
import {
  Upload,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Camera,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function BlogImageUpload() {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string>("");
  const [, setImageUrl] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Load existing image from localStorage on mount
  useEffect(() => {
    const existingImage = localStorage.getItem("blogImage");
    if (existingImage) {
      setImagePreview(existingImage);
      setImageUrl(existingImage);
      setUploadComplete(true);
    }
  }, []);

  const simulateProgress = useCallback(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    return interval;
  }, []);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsUploadingImage(true);
    setUploadComplete(false);
    const progressInterval = simulateProgress();

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog_images");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgemvdcue/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        // setBlogImage(data.secure_url)
        localStorage.setItem("blogImage", data.secure_url);
        setProgress(100);
        setUploadComplete(true);

        toast("Success! , Image uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast("Upload Failed, Failed to upload image. Please try again.");
      setImagePreview("");
      setImageUrl("");
    } finally {
      clearInterval(progressInterval);
      setIsUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleImageUpload(files[0]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageUpload(e.dataTransfer.files[0]);
      }
    },
    [] // Removed handleImageUpload from dependencies
  );

  const removeImage = () => {
    setImagePreview("");
    setImageUrl("");
    setUploadComplete(false);
    localStorage.removeItem("blogImage");
    // setBlogImage("")
  };

  const handleNext = () => {
    const blogImage = localStorage.getItem("blogImage");
    if (blogImage) {
      router.push("content");
    } else {
      toast("Image Required, Please upload at least one image to continue");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link
              href="/createBlog"
              className="hover:text-foreground transition-colors"
            >
              Create Blog
            </Link>
            <span>/</span>
            <span className="text-foreground">Upload Image</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Upload Blog Image
              </h1>
              <p className="text-muted-foreground">
                Add a compelling visual to your blog post
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Area */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Choose Your Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Progress */}
                {isUploadingImage && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Uploading...
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Drag and Drop Area */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : uploadComplete
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploadingImage}
                  />

                  {uploadComplete ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Upload Complete!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your image has been uploaded successfully
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {dragActive
                            ? "Drop your image here"
                            : "Upload your blog image"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop an image, or click to browse
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isUploadingImage}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>

                {/* File Requirements */}
                <div className="mt-4 text-xs text-muted-foreground space-y-1">
                  <p>• Supported formats: JPG, PNG, GIF, WebP</p>
                  <p>• Maximum file size: 10MB</p>
                  <p>• Recommended dimensions: 1200x630px</p>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Choose relevant images
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Select images that complement your blog content
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      High-quality visuals
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Use crisp, clear images for better engagement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      SEO optimization
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Good images improve search engine visibility
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Image Preview
                  </span>
                  {imagePreview && (
                    <Button variant="ghost" size="sm" onClick={removeImage}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Blog image preview"
                        className="object-cover"
                        onError={() => {
                          setImagePreview("");
                          setImageUrl("");
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Ready to use
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No image selected
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card>
              <CardHeader>
                <CardTitle>Why Images Matter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload a picture that complements your blog post to make it
                  more engaging and visually appealing. A well-chosen image not
                  only grabs attention but also improves readability and SEO.
                  Make sure your image is high-quality and appropriately sized
                  for the best user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t">
          <Button asChild variant="outline">
            <Link href="/createBlog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>

          <Button onClick={handleNext} disabled={isUploadingImage} size="lg">
            {isUploadingImage ? (
              "Uploading..."
            ) : (
              <>
                Continue to Content
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Status Alert */}
        {!imagePreview && !isUploadingImage && (
          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please upload an image to continue to the next step.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
