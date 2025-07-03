"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, Heart } from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  likes?: number;
  isOptimistic?: boolean;
}

interface CommentBarProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
}

export default function CommentBar({
  comments = [],
  onAddComment,
}: CommentBarProps) {
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with external comments prop
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const tempComment: Comment = {
      id: `temp-${Date.now()}`,
      author: {
        name: "You", // In a real app, this would come from user context
        initials: "YU",
      },
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      isOptimistic: true, // Flag to identify optimistic comments
    };

    // Optimistically add comment to UI
    setLocalComments((prev) => [tempComment, ...prev]);
    setNewComment("");
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional failures for demo
          if (Math.random() > 0.1) {
            resolve(true);
          } else {
            reject(new Error("Failed to post"));
          }
        }, 1000);
      });

      // Success: Update the optimistic comment to confirmed
      setLocalComments((prev) =>
        prev.map((comment) =>
          comment.id === tempComment.id
            ? { ...comment, id: `confirmed-${Date.now()}`, isOptimistic: false }
            : comment
        )
      );

      if (onAddComment) {
        onAddComment(tempComment.content);
      }
    } catch (error) {
      // Error: Remove the optimistic comment
      setLocalComments((prev) =>
        prev.filter((comment) => comment.id !== tempComment.id)
      );
      setNewComment(tempComment.content); // Restore the comment text

      // You could show a toast notification here
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  // Use localComments instead of comments prop
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Comments Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-lg font-semibold">
          Comments ({localComments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      <Card>
        <CardHeader className="pb-3">
          <h4 className="text-sm font-medium">Leave a comment</h4>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="What are your thoughts?"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isSubmitting}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      {localComments.length > 0 ? (
        <div className="space-y-4">
          {localComments.map((comment, index) => (
            <div key={comment.id}>
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={comment.author.avatar || "/placeholder.svg"}
                    alt={comment.author.name}
                  />
                  <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                    {comment.isOptimistic && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        Posting...
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${
                      comment.isOptimistic ? "opacity-70" : ""
                    }`}
                  >
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-muted-foreground hover:text-foreground"
                      disabled={comment.isOptimistic}
                    >
                      <Heart className="h-3 w-3" />
                      <span className="text-xs">{comment.likes || 0}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-muted-foreground hover:text-foreground"
                      disabled={comment.isOptimistic}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              {index < localComments.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}
