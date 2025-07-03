"use client"

import { useEffect, useRef } from "react"
import DOMPurify from "isomorphic-dompurify"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && content) {
      // Sanitize the HTML content properly
      const sanitizedContent = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "b",
          "i",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "pre",
          "code",
          "a",
          "img",
          "span",
          "div",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target"],
        KEEP_CONTENT: true,
      })

      // Set the sanitized HTML content
      contentRef.current.innerHTML = sanitizedContent
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      className="blog-content max-w-none
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-6 [&_h1]:mt-8 [&_h1]:leading-tight
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:leading-tight
        [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-3 [&_h3]:mt-5 [&_h3]:leading-tight
        [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mb-2 [&_h4]:mt-4
        [&_p]:text-foreground [&_p]:leading-7 [&_p]:mb-4 [&_p]:text-base
        [&_p:first-child]:mt-0 [&_p:last-child]:mb-0
        [&_strong]:font-semibold [&_strong]:text-foreground
        [&_em]:italic [&_em]:text-foreground
        [&_b]:font-semibold [&_b]:text-foreground
        [&_i]:italic [&_i]:text-foreground
        [&_ul]:my-4 [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:pl-6
        [&_li]:text-foreground [&_li]:mb-2 [&_li]:leading-7
        [&_ul_li]:list-disc [&_ol_li]:list-decimal
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted/50 
        [&_blockquote]:py-3 [&_blockquote]:px-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-4
        [&_blockquote]:text-foreground [&_blockquote]:italic
        [&_pre]:bg-muted [&_pre]:border [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:my-4
        [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:font-mono
        [&_code]:bg-muted [&_code]:px-2 [&_code]:py-1 [&_code]:rounded
        [&_code]:text-foreground [&_code]:font-mono [&_code]:text-sm
        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 
        [&_a:hover]:text-primary/80 [&_a]:transition-colors
        [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
    />
  )
}
