"use client"

interface SimpleBlogContentProps {
  content: string
}

export function SimpleBlogContent({ content }: SimpleBlogContentProps) {
  // Split content into paragraphs and preserve formatting
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0)

  return (
    <div className="space-y-6 text-foreground">
      {paragraphs.map((paragraph, index) => {
        const lines = paragraph.split("\n").filter((line) => line.trim().length > 0)

        return (
          <div key={index} className="space-y-2">
            {lines.map((line, lineIndex) => {
              // Check if line looks like a heading (starts with #)
              if (line.trim().startsWith("###")) {
                return (
                  <h3 key={lineIndex} className="text-xl font-semibold text-foreground mt-6 mb-3">
                    {line.replace(/^#+\s*/, "")}
                  </h3>
                )
              } else if (line.trim().startsWith("##")) {
                return (
                  <h2 key={lineIndex} className="text-2xl font-bold text-foreground mt-8 mb-4">
                    {line.replace(/^#+\s*/, "")}
                  </h2>
                )
              } else if (line.trim().startsWith("#")) {
                return (
                  <h1 key={lineIndex} className="text-3xl font-bold text-foreground mt-8 mb-6">
                    {line.replace(/^#+\s*/, "")}
                  </h1>
                )
              }

              // Regular paragraph
              return (
                <p key={lineIndex} className="text-base leading-7 text-foreground">
                  {line}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
