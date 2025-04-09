"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import { blog } from "../page";
import { toast } from "@/hooks/use-toast";
import BlogDisplayer from "../../components/blogDisplayer";

export default function Page() {
  const params = useSearchParams();
  const [blog, setBlog] = React.useState<blog | null>(null);
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `/api/FetchSingleBlog?blogId=${params.get("blogId")}`
      );
      console.log(response.data.data[0]);
      console.log(response.data.data[0].blog_content);
      setBlog(response.data.data[0]);
    } catch (error) {
      toast({
        title: "Fetch Blog",
        description: `Failed to fetch blog because ${error}`,
      });
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="py-20">
      {blog?.blog_content && <BlogDisplayer>{blog.blog_content}</BlogDisplayer>}{" "}
    </div>
  );
}
