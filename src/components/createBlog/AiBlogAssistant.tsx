"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, RefreshCw } from "lucide-react";
import axios from "axios";

interface AIBlogAssistantProps {
  onContentGenerated: (content: string) => void;
  imageUrl :string
}

export function AIBlogAssistant({ onContentGenerated, imageUrl }: AIBlogAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      // Simulate AI content generation
      const {
        data :{blog}
      } = await axios.post("/api/generateContent", { prompt ,imageUrl});

      console.log(blog)

      setGeneratedContent(blog.text);
    } catch (error) {
      console.error("Content generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const useGeneratedContent = () => {
    onContentGenerated(generatedContent);
    setGeneratedContent("");
    setPrompt("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Writing Assistant
          <Badge variant="secondary">Beta</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe what you want to write about..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
        />

        <Button
          type="button"
          onClick={generateContent}
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: generatedContent }}
              />
            </div>
            <Button onClick={useGeneratedContent} className="w-full">
              Use This Content
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
