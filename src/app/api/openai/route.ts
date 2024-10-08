import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: safetySettings,
});

export async function POST(req: NextRequest) {
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
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json("Can't process the request right now.");
  }
}
