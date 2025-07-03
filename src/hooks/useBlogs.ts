"use client";

import { useState, useEffect, useCallback } from "react";
import axios, { type AxiosError } from "axios";
import type { Blog } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UseBlogsReturn {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export type BlogCardType = {
  id: string;
  title: string;
  blog_content: string;
  created_at: string; // or Date, depending on how you're handling it
  profile_id: string;
  like_count: number; // it’s bigint in SQL, but comes as JS number
  comment_count: number; // same ^
  is_liked_by_user: boolean;
  images: string[];
};

export function useBlogs(): UseBlogsReturn {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/api/fetchBlogs");

      // Filter out blogs with empty content
      const validBlogs = response.data.data.filter(
        (blog: Blog) => blog.blog_content && blog.blog_content.trim() !== ""
      );

      setBlogs(validBlogs);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data || "An unexpected error occurred";

      setError(errorMessage as string);

      toast(`Failed to fetch blogs: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
  };
}

export async function fetchBlogs(): Promise<BlogCardType[]> {
  try {
    const {
      data: { data },
    } = await axios.get("/api/fetchBlogs");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useBlogsCard() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
