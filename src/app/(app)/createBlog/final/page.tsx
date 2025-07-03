"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Share2,
  Eye,
  Download,
  Edit,
  ArrowRight,
  Calendar,
  Clock,
  Users,
  Heart,
  MessageCircle,
  ExternalLink,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { BlogContentRenderer } from "@/components/createBlog/blogRenderer";
import { toast } from "react-toastify";

interface BlogData {
  title: string;
  content: string;
  image: string | null;
  publishedAt: Date;
}

export default function BlogEnd() {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullPreview, setShowFullPreview] = useState(false);

  useEffect(() => {
    const loadBlogData = () => {
      try {
        const previewContent = localStorage.getItem("blogPreview");
        const blogImage = localStorage.getItem("blogImage");
        const blogDraft = localStorage.getItem("blogDraft");

        let title = "Your Amazing Blog Post";
        if (blogDraft) {
          const draft = JSON.parse(blogDraft);
          title = draft.title || title;
        }

        setBlogData({
          title,
          content: previewContent || "No content available",
          image: blogImage,
          publishedAt: new Date(),
        });
      } catch (error) {
        console.error("Failed to load blog data:", error);
        setBlogData({
          title: "Your Blog Post",
          content: "Content not available",
          image: null,
          publishedAt: new Date(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogData();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied!,Link copied to clipboard");
    } catch (error) {
      console.log(error);
      toast("Copy Failed");
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.origin + "/blogs";
    const text = `Check out my new blog post: ${blogData?.title}`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    window.open(
      shareUrls[platform as keyof typeof shareUrls],
      "_blank",
      "width=600,height=400"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your blog...</p>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <p className="text-muted-foreground mb-4">No blog data found</p>
            <Button asChild>
              <Link href="/createBlog">Create New Blog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const wordCount = blogData.content
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            🎉 Blog Published Successfully!
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Congratulations! Your blog post has been published and is now live.
            Share it with the world and start engaging with your readers.
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Generated
            </Badge>
            <Badge variant="outline">{wordCount} words</Badge>
            <Badge variant="outline">{readingTime} min read</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Blog Preview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Blog Preview
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullPreview(!showFullPreview)}
                  >
                    {showFullPreview ? "Show Less" : "Show Full Preview"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Featured Image */}
                {blogData.image && (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                    <Image
                      src={blogData.image || "/placeholder.svg"}
                      alt="Blog featured image"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Blog Title */}
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                  {blogData.title}
                </h2>

                {/* Blog Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{blogData.publishedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Public</span>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Blog Content */}
                <div
                  className={
                    showFullPreview ? "" : "max-h-96 overflow-hidden relative"
                  }
                >
                  <BlogContentRenderer content={blogData.content} />
                  {!showFullPreview && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Heart className="h-4 w-4" />
                      <span>24</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>8</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>12</span>
                    </Button>
                  </div>
                  <Badge variant="secondary">Live Preview</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/blogs">
                    <Eye className="h-4 w-4 mr-2" />
                    View Live Blog
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Blog
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    copyToClipboard(window.location.origin + "/blogs")
                  }
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </CardContent>
            </Card>

            {/* Share on Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" />
                  Share Your Blog
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => shareOnSocial("twitter")}
                >
                  <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                  Share on Twitter
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => shareOnSocial("facebook")}
                >
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  Share on Facebook
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => shareOnSocial("linkedin")}
                >
                  <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                  Share on LinkedIn
                </Button>
              </CardContent>
            </Card>

            {/* Blog Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Blog Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Word Count
                    </span>
                    <Badge variant="secondary">{wordCount}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Reading Time
                    </span>
                    <Badge variant="secondary">{readingTime} min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Published
                    </span>
                    <Badge variant="secondary">
                      {blogData.publishedAt.toLocaleDateString()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <Badge className="bg-green-500">Live</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What is Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Link href="/createBlog">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Create Another Blog
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Link href="/blogs">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Blogs
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Link href="/dashboard">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Footer */}
        <div className="text-center mt-16 pt-8 border-t">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Create More Amazing Content?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Keep the momentum going! Create more engaging blog posts and build
            your audience with AI-powered content creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/createBlog">
                <Sparkles className="h-4 w-4 mr-2" />
                Create New Blog
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blogs">
                <Eye className="h-4 w-4 mr-2" />
                Explore All Blogs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
