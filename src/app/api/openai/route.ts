import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const rumtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { prompt } = await req.json();

    console.log(prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a language translator" +
            "You translate the text in th specified language",
        },
        ...prompt,
      ],
      stream: true,
      temperature: 1,
    });

    console.log(response);
    //const stream = OpenAIStream(response);

    //return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json("not ok");
  }
}
