import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import LikeButton from "../like-comment/LikeButton";
import type { BlogCardType } from "@/hooks/useBlogs";

interface BlogCardProps {
  blog: BlogCardType & {
    title?: string; // Adding title to the type
    author?: string; // Optional author field
    category?: string; // Optional category field
  };
}

export function BlogCard({ blog }: BlogCardProps) {
  const truncatedContent =
    blog.blog_content.length > 120
      ? blog.blog_content.slice(0, 120) + "..."
      : blog.blog_content;

  // Strip HTML tags for preview
  const plainTextContent = truncatedContent.replace(/<[^>]*>/g, "");

  // Generate a fallback title if none provided
  const displayTitle =
    blog.title ||
    plainTextContent.slice(0, 60) + (plainTextContent.length > 60 ? "..." : "");

  // Format numbers for display
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white dark:bg-gray-900">
      <div className="relative overflow-hidden">
        <img
          src={blog.images[0] || "/placeholder.svg?height=240&width=400"}
          alt={displayTitle}
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg?height=240&width=400";
          }}
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Category badge */}
        {blog.category && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg transition-all duration-300 group-hover:shadow-xl"
          >
            {blog.category}
          </Badge>
        )}

        {/* AI Generated badge */}
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 bg-white/95 text-gray-800 backdrop-blur-sm shadow-lg transition-all duration-300 group-hover:bg-white group-hover:shadow-xl border-0"
        >
          AI Generated
        </Badge>

        {/* Floating title overlay on hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
            {displayTitle}
          </h3>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <Link
          href={`/blogs/blog?blogId=${blog.id}`}
          className="block group-hover:text-blue-600 transition-colors duration-300"
        >
          <h2 className="font-bold text-xl leading-tight line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors duration-300">
            {displayTitle}
          </h2>
        </Link>

        {/* Author */}
        {blog.author && (
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            by {blog.author}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors duration-200">
            <Calendar className="h-3.5 w-3.5" />
            <span>2 days ago</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-green-500 transition-colors duration-200">
            <Clock className="h-3.5 w-3.5" />
            <span>5 min read</span>
          </div>
        </div>

        {/* Content preview */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {plainTextContent}
        </p>

        {/* Engagement metrics */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200">
              <LikeButton
                blog_id={blog.id}
                state={blog.is_liked_by_user}
                initialLikeCount={blog.like_count}
              />
            </div>
            <div className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-200">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{formatCount(0)} comments</span>
            </div>
          </div>

          {/* View count */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-purple-500 transition-colors duration-200">
            <Eye className="h-3.5 w-3.5" />
            <span>
              {formatCount(Math.floor(Math.random() * 1000) + 100)} views
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          variant="default"
          size="sm"
          className="w-full group/btn bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl border-0 text-white font-medium"
        >
          <Link
            href={`/blogs/blog?blogId=${blog.id}`}
            className="flex items-center justify-center gap-2"
          >
            <span>Read Full Article</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
