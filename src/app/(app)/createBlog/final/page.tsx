"use client"
import React, { useEffect, useRef, useState } from 'react'

export default function BlogEnd() {
  const [previewBlog,setBlogPreview]=useState<string |null>(null)
  const blogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(localStorage.getItem('blogPreview')){
      setBlogPreview(localStorage.getItem('blogPreview'))
    }
    if (blogContentRef.current && previewBlog) {
      blogContentRef.current.innerHTML = previewBlog;

      // Add spacing between headings
      const headings = blogContentRef.current.querySelectorAll('h2, h3, h4');
      headings.forEach((heading) => {
        (heading as HTMLElement).style.marginTop = '20px';
        (heading as HTMLElement).style.fontSize = '28px';
      });

      // Add spacing between paragraphs
      const paragraphs = blogContentRef.current.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        paragraph.style.marginBottom = '20px';
      });
    }
  }, [previewBlog])
  
  return (
    <div>
        <p className='text-white text-3xl font-sans font-bold m-auto text-center my-20'>Your blog has published</p>
        <p className='text-white text-2xl font-sans mx-20 font-bold underline my-8'>Preview your blog</p>
        <div className="text-zinc-500 text-lg mx-20" ref={blogContentRef} dangerouslySetInnerHTML={{__html:previewBlog ?? 'No info available'}}></div>
    </div>
  )
}
