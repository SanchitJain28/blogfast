"use client";
import React, { useEffect, useRef } from "react";

export default function BlogDisplayer({ children }: { children: string }) {
  const blogContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (blogContentRef.current) {
      // Color raw text nodes (not wrapped in any tag)
      blogContentRef.current.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          const span = document.createElement("span");
          span.style.color = "white";
          span.style.fontSize = "20px";
          span.textContent = node.textContent;
          blogContentRef.current?.replaceChild(span, node);
        }
      });

      // Add spacing between headings
      blogContentRef.current.innerHTML = children as string;
      const headings = blogContentRef.current.querySelectorAll("h1,h2, h3, h4");
      headings.forEach((heading) => {
        (heading as HTMLElement).style.color = "blue";
        (heading as HTMLElement).style.marginTop = "20px";
        (heading as HTMLElement).style.fontSize = "32px";
        (heading as HTMLElement).style.marginBottom = "15px";
      });

      // Add spacing between paragraphs
      const paragraphs = blogContentRef.current.querySelectorAll("p");
      paragraphs.forEach((paragraph) => {
        paragraph.style.marginBottom = "40px";
        paragraph.style.fontSize = "20px";
        paragraph.style.color = "white";
      });

      const listElements = blogContentRef.current.querySelectorAll("li");
      listElements.forEach((listElements) => {
        (listElements as HTMLElement).innerHTML = "+" + listElements.innerHTML;
        (listElements as HTMLElement).style.marginBottom = "5px";
        (listElements as HTMLElement).style.fontSize = "20px";
        (listElements as HTMLElement).style.color = "white";
      });

      const Others = blogContentRef.current.querySelectorAll(
        "pre, blockquote, code, a, strong, em, span"
      );
      Others.forEach((others) => {
        (others as HTMLElement).style.marginBottom = "5px";
        (others as HTMLElement).style.fontSize = "20px";
        (others as HTMLElement).style.color = "white";
      });
    }
  }, []);
  return (
    <div>
      <div className=" text-lg mx-20" ref={blogContentRef}></div>
    </div>
  );
}
