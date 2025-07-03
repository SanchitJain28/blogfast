import { createClient } from "@/app/utils/supabase/client";
import { useAuth } from "@/contexts/authContext";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const supabase = createClient();

export default function LikeButton({
  state,
  blog_id,
  initialLikeCount = 0,
  className,
}: {
  state: boolean;
  blog_id: string;
  initialLikeCount?: number;
  className?: string;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [likeState, setLikeState] = useState(state);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = async () => {
    setLoading(true);
    setLikeState(true);
    setLikeCount((prev) => prev + 1);

    try {
      const { error } = await supabase.from("blog_likes").insert({
        profile_id: user?.id,
        blog_id: blog_id,
      });
      if (error) {
        console.log(error);
        setLikeState(false);
        setLikeCount((prev) => prev - 1);
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    setLoading(true);
    setLikeState(false);
    setLikeCount((prev) => prev - 1);

    try {
      const { error } = await supabase
        .from("blog_likes")
        .delete()
        .eq("profile_id", user?.id)
        .eq("blog_id", blog_id);
      if (error) {
        console.log(error);
        setLikeState(true);
        setLikeCount((prev) => prev + 1);
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={likeState ? handleDislike : handleLike}
      disabled={loading}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 rounded-full",
        "transition-all duration-200 ease-in-out",
        "hover:shadow-lg active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        likeState
          ? "bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-200"
          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            key="heart"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all duration-200",
                likeState ? "fill-current text-red-500" : "text-gray-500"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex items-center gap-1"
        animate={{
          color: likeState ? "#dc2626" : "#6b7280",
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-sm font-medium">
          {likeState ? "Liked" : "Like"}
        </span>
        <motion.span
          key={likeCount}
          initial={{ scale: 1.2, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-semibold"
        >
          {likeCount}
        </motion.span>
      </motion.div>

      {/* Floating hearts animation on like */}
      <AnimatePresence>
        {likeState && (
          <motion.div
            key="floating-hearts"
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: (i - 1) * 10,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.8],
                  y: -30 - i * 5,
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                <Heart className="h-3 w-3 fill-red-500 text-red-500" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple effect */}
      <AnimatePresence>
        {likeState && (
          <motion.div
            key="ripple"
            className="absolute inset-0 rounded-full border-2 border-red-300"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
