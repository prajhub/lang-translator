import OpenAI from "openai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { prompt } = await req.json();

    console.log(prompt);

    const finalPrompt =
      "how to say " +
      prompt +
      " " +
      "also " +
      " Give me two example of using it in a sentence";

    const result = await model.generateContent(finalPrompt);

    return NextResponse.json({ message: result.response.text() });

    //return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json("Can't process the request right now.");
  }
}
