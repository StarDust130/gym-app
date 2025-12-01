import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, profile, meals } = body;

    if (!question) {
      return NextResponse.json(
        { error: "question is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      temperature: 0.2,
      max_completion_tokens: 600,
      messages: [
        {
          role: "system",
          content:
            "You are a friendly certified nutritionist. Give concise, practical diet insights in under 150 words. Always tailor the plan to the provided profile, goal, and dietary restrictions.",
        },
        {
          role: "user",
          content: `Question: ${question}\nProfile: ${JSON.stringify(
            profile ?? {}
          )}\nLogged meals: ${JSON.stringify((meals ?? []).slice(0, 5))}`,
        },
      ],
    });

    const answer =
      completion.choices?.[0]?.message?.content ||
      "Could not generate advice right now.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("POST /api/diet-coach error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
