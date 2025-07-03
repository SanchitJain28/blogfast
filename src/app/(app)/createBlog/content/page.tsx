"use client";

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  Save,
  Send,
  ArrowLeft,
  FileText,
  ImageIcon,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Target,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AIBlogAssistant } from "@/components/createBlog/AiBlogAssistant";

interface BlogData {
  title: string;
  content: string;
  image: string | null;
}

export default function BlogContent() {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    content: "",
    image: null,
  });
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Auto-save functionality
  const autoSave = useCallback(async (data: BlogData) => {
    if (!data.title && !data.content) return;

    setIsSaving(true);
    try {
      localStorage.setItem("blogDraft", JSON.stringify(data));
      localStorage.setItem("blogPreview", data.content);
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Debounced auto-save
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      autoSave(blogData);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [blogData, autoSave]);

  // Calculate reading time and word count
  useEffect(() => {
    if (blogData.content) {
      const text = blogData.content.replace(/<[^>]*>/g, "");
      const words = text.trim().split(/\s+/).length;
      setWordCount(words);
      setReadingTime(Math.ceil(words / 200)); // Average reading speed: 200 words per minute
    } else {
      setWordCount(0);
      setReadingTime(0);
    }
  }, [blogData.content]);

  // Load saved data on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("blogImage");
    console.log(savedImage);
    const savedDraft = localStorage.getItem("blogDraft");

    if (savedImage) {
      console.log("Image is saved", savedImage);
      setBlogData((prev) => ({ ...prev, image: savedImage }));
    }

    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setBlogData((prev) => ({ ...prev, ...draft }));
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (content: string) => {
    setBlogData((prev) => ({ ...prev, content }));
  };

  const validateBlog = (): boolean => {
    if (!blogData.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title for your blog post",
        variant: "destructive",
      });
      return false;
    }

    if (!blogData.content.trim()) {
      toast({
        title: "Content Required",
        description: "Please add some content to your blog post",
        variant: "destructive",
      });
      return false;
    }

    if (!blogData.image) {
      toast({
        title: "Image Required",
        description: "Please upload an image for your blog post",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const savedImage = localStorage.getItem("blogImage");
    console.log(savedImage);

    console.log(blogData.image);

    if (!validateBlog()) return;

    try {
      setIsUploading(true);

      const { data } = await axios.post("/api/createBlog", {
        title: blogData.title,
        blog_content: blogData.content,
        images: blogData.image,
      });

      console.log(data);

      toast({
        title: "Success!",
        description: "Your blog has been published successfully",
        className: "bg-green-500 text-white",
      });

      // Clear saved data
      localStorage.removeItem("blogImage");
      localStorage.removeItem("blogContent");
      localStorage.removeItem("blogDraft");

      router.push("final");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Publication Failed",
        description:
          "An error occurred while publishing your blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getSEOScore = (): number => {
    let score = 0;
    if (blogData.title.length >= 30 && blogData.title.length <= 60) score += 25;
    if (wordCount >= 300) score += 25;
    if (blogData.image) score += 25;
    if (blogData.content.includes("<h1>") || blogData.content.includes("<h2>"))
      score += 25;
    return score;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
            <Link
              href="/createBlog/blogImageUpload"
              className="hover:text-foreground transition-colors"
            >
              Upload Image
            </Link>
            <span>/</span>
            <span className="text-foreground">Write Content</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Write Your Blog
                </h1>
                <p className="text-muted-foreground">
                  Create engaging content with AI assistance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSaving && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Saving...
                </Badge>
              )}
              {lastSaved && !isSaving && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Saved {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Title Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Blog Title
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter an engaging title for your blog post..."
                    value={blogData.title}
                    onChange={handleTitleChange}
                    className="text-lg h-12"
                    maxLength={100}
                  />
                  <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                    <span>{blogData.title.length}/100 characters</span>
                    <span
                      className={
                        blogData.title.length >= 30 &&
                        blogData.title.length <= 60
                          ? "text-green-500"
                          : "text-yellow-500"
                      }
                    >
                      {blogData.title.length >= 30 &&
                      blogData.title.length <= 60
                        ? "Good length"
                        : "30-60 chars recommended"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Blog Content
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {showPreview ? "Edit" : "Preview"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {showPreview ? (
                    <div
                      className="min-h-[500px] p-4 border rounded-lg bg-background prose prose-slate dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          blogData.content || "<p>No content to preview</p>",
                      }}
                    />
                  ) : (
                    <Editor
                      apiKey="6p1aqw5kkmimf1n9npynfg07vo395qljgid959bnynvrukmp"
                      value={blogData.content}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; }",
                      }}
                      onEditorChange={handleContentChange}
                    />
                  )}

                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>{wordCount} words</span>
                      <span>{readingTime} min read</span>
                    </div>
                    <span
                      className={
                        wordCount >= 300 ? "text-green-500" : "text-yellow-500"
                      }
                    >
                      {wordCount >= 300
                        ? "Good length"
                        : "300+ words recommended"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <AIBlogAssistant
                onContentGenerated={handleContentChange}
                imageUrl={blogData.image ?? ""}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Featured Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {blogData.image ? (
                    <div className="space-y-4">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img
                          src={blogData.image || "/placeholder.svg"}
                          alt="Blog featured image"
                          className="object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("blogImageUpload")}
                        className="w-full"
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        No image uploaded
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("blogImageUpload")}
                      >
                        Upload Image
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* SEO Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    SEO Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Score</span>
                      <Badge
                        variant={
                          getSEOScore() >= 75
                            ? "default"
                            : getSEOScore() >= 50
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {getSEOScore()}%
                      </Badge>
                    </div>
                    <Progress value={getSEOScore()} className="h-2" />
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        {blogData.title.length >= 30 &&
                        blogData.title.length <= 60 ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-yellow-500" />
                        )}
                        <span>Title length (30-60 chars)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {wordCount >= 300 ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-yellow-500" />
                        )}
                        <span>Content length (300+ words)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {blogData.image ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-yellow-500" />
                        )}
                        <span>Featured image</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {blogData.content.includes("<h1>") ||
                        blogData.content.includes("<h2>") ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-yellow-500" />
                        )}
                        <span>Headings structure</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Publishing Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Publish
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="w-full"
                    size="lg"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Publish Blog
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => autoSave(blogData)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>

                  <Separator />

                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/createBlog/blogImageUpload">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Image
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>

        {/* Validation Alert */}
        {(!blogData.title || !blogData.content || !blogData.image) && (
          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Complete all sections (title, content, and image) before
              publishing your blog post.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
