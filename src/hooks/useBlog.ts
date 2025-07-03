"use client";

import { useState, useEffect, useCallback } from "react";
import axios, { type AxiosError } from "axios";
import type { Blog } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UseBlogReturn {
  blog: Blog | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface comments {
  profile_id: string;
  text: string;
}

export interface SingleBlog {
  id: string;
  blog_content: string;
  images: string[]; // assuming it's an array of image URLs
  title: string;
  profile_id: string;
  created_at: string; // ISO timestamp
  like_count: number;
  is_liked_by_current_user: boolean;
  comments: comments[];
}

export function useBlog(blogId: string | null): UseBlogReturn {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    if (!blogId) {
      setError("No blog ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/api/FetchSingleBlog?blogId=${blogId}`);

      if (response.data.data && response.data.data.length > 0) {
        setBlog(response.data.data[0]);
      } else {
        setError("Blog not found");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data || "Failed to fetch blog";

      setError(errorMessage as string);

      // toast({
      //   title: "Error",
      //   description: `Failed to fetch blog: ${errorMessage}`,
      //   variant: "destructive",
      // });

      toast("Failed to fetch blog: ${errorMessage}");
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return {
    blog,
    loading,
    error,
    refetch: fetchBlog,
  };
}

async function fetchSingleBlog(id: string): Promise<SingleBlog> {
  try {
    const {
      data: { blog },
    } = await axios.post(`/api/FetchSingleBlog?id=${id}`);
    return blog;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useSingleBlog({ id }: { id: string }) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchSingleBlog(id),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
