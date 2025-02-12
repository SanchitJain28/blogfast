import { google } from '@ai-sdk/google';
import { NextRequest } from 'next/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
    const { prompt } = await request.json()
    if (!prompt) {
        return Response.json({
            error: "prompt not provided"
        })
    }
    try {
        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GEMINI_API_KEY
        });
        const { text } = await generateText({
            model: google('gemini-2.0-pro-exp-02-05'),
            prompt: prompt,
        });
        return Response.json({
            text
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            error
        })
    }

}