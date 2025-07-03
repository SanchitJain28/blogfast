"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookOpen,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useSingleBlog } from "@/hooks/useBlog";
import { SimpleBlogRenderer } from "./simpleBlogRenderer";
import { useEffect } from "react";
import CommentBar from "./CommentBar";
import LikeButton from "../like-comment/LikeButton";

export function BlogPageContent() {
  const params = useSearchParams();
  const blogId = params.get("blogId");
  const {
    data: blog,
    isPending,
    isError,
    refetch,
  } = useSingleBlog({ id: blogId ?? "" });

  useEffect(() => {
    if (blog) {
      console.log(blog);
    }
  }, [blog]);
  if (isPending) {
    return <BlogPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load blog post. Please try again.</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Blog not found
            </h2>
            <p className="text-muted-foreground mb-6">
              The blog post you re looking for does not exist.
            </p>
            <Button asChild>
              <Link href="/blogs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link
            href="/blogs"
            className="hover:text-foreground transition-colors"
          >
            Blogs
          </Link>
          <span>/</span>
          <span className="text-foreground">Blog Post</span>
        </nav>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Generated
            </Badge>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{Math.ceil(blog.blog_content.length / 1000)} min read</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/blogs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Link>
            </Button>

            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {blog.images[0] && (
          <div className="mb-8">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={blog.images[0] || "/placeholder.svg"}
                alt="Blog featured image"
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg?height=400&width=800";
                }}
              />
            </div>
          </div>
        )}

        {/* Blog Content */}
        <Card className="mb-8">
          <CardContent className="p-8 lg:p-12">
            <SimpleBlogRenderer content={blog.blog_content} />
          </CardContent>
        </Card>

        <LikeButton
          blog_id={blog.id}
          state={blog.is_liked_by_current_user}
          initialLikeCount={blog.like_count}
        />

        <CommentBar comments={[]} />

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-8 border-t">
          <Button asChild variant="outline">
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              More Blogs
            </Link>
          </Button>

          <Button asChild>
            <Link href="/createBlog">Create Your Own Blog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-8"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
