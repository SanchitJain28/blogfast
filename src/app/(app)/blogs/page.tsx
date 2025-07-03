"use client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, BookOpen } from "lucide-react";
import { useBlogsCard } from "@/hooks/useBlogs";
import { HeroSection } from "@/components/blogs/HeroSection";
import BlogGrid from "./blog/BlogGrid";
export default function BlogsPage() {
  const { data: blogs, isPending, isError, refetch } = useBlogsCard();

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load blogs. Please try again.</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Blogs Section */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Latest Blogs</h2>
            <Badge variant="secondary" className="ml-auto">
              {blogs?.length} {blogs?.length === 1 ? "Blog" : "Blogs"}
            </Badge>
          </div>

          {/* Blogs Grid */}

          <BlogGrid blogs={blogs} isLoading={isPending} />
        </section>
      </div>
    </div>
  );
}
