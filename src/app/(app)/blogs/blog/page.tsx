"use client"

import { BlogPageContent } from "@/components/blog/blogPageContent"
import { Suspense } from "react"

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogPageContent />
    </Suspense>
  )
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
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
