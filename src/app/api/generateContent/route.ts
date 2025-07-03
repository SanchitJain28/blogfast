import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Input validation schema
const requestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required").max(500, "Prompt too long"),
  blogContext: z.string().optional(),
});

// Output schema with better structure
// const tweetSchema = z.object({
//   text: z.string(),
//   tone: z.enum(["humorous", "inspirational", "trendy"]),
//   characterCount: z.number(),
// });

// const tweetsResponseSchema = z.array(tweetSchema).length(3);

// Initialize Google AI with environment variable
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
});

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedInput = requestSchema.parse(body);
    const { prompt } = validatedInput;

    // Improved prompt with better structure and guidance
    const systemPrompt = `You are an expert content writer for a modern blogging platform. Your task is to write **1 high-quality blog post** based on the given topic.

REQUIREMENTS:
- Blog must be written in proper **semantic HTML**, using tags such as <h1>, <h2>, <h3>, <p>, <ul>, <li>, etc.
- The blog must be **SEO-optimized**, using relevant keywords naturally within the content and headings
- Structure the blog using **headings and paragraphs**
- The writing must be **engaging, catchy**, and hold the reader’s attention
- Content should include **modern updates, trends, or recent news** where applicable
- Keep the language **simple, easy to read, and free from jargon**
- Blog length should be **800–1200 words**
- Use an **informative, friendly, or authoritative tone** based on the topic
- Avoid filler or repetitive content
- End with a strong conclusion or call to action

FORMAT:
1. Return the **entire blog post using HTML tags only**
2. After the blog content, include a section like this:
   <p><strong>Tags:</strong> tag1, tag2, tag3, ...</p>

ONLY WRITE THE BLOG POST IN HTML FORMAT. DO NOT ADD ANY OTHER TEXT OR EXPLANATIONS.

TOPIC: ${prompt}`;


    const { object: blog } = await generateObject({
      model: google("gemini-2.0-flash-lite"),
      schema: z.object({
        text: z.string(),
        tags: z.array(z.string()).optional(),
      }),
      prompt: systemPrompt,
      temperature: 0.8, // Add some creativity
    });

    // Validate and enhance response
    // const enhancedTweets = tweets.map((tweet, index) => ({
    //   ...tweet,
    //   characterCount: tweet.text.length,
    //   id: `tweet_${index + 1}`,
    // }));

    return NextResponse.json({
      blog,
      success: true,
      message: "Blog generated successfully",
    });
  } catch (error) {
    console.error("Blog generation error:", error);

    // Handle different error types
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`),
        },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to generate Blog . Please try again." },
      { status: 500 }
    );
  }
}
