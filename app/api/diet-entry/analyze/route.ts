import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const MODEL = "meta-llama/llama-4-maverick-17b-128e-instruct";

type ConfidenceLevel = "low" | "medium" | "high";

const sanitizeNumber = (value: unknown) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.round(num);
};

const sanitizeConfidence = (value: unknown): ConfidenceLevel => {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }
  return "medium";
};

export async function POST(req: Request) {
  try {
    const { description, mealType, goal } = await req.json();

    if (!description || description.trim().length < 8) {
      return NextResponse.json({
        ok: false,
        message: "Give me a little more detail about what you ate.",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing AI key. Add GROQ_API_KEY to continue.",
        },
        { status: 500 }
      );
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      max_completion_tokens: 600,
      messages: [
        {
          role: "system",
          content:
            'You are a witty, modern nutritionist AI. Reply ONLY with JSON: {"nutrients":{"calories":number,"protein":number,"carbs":number,"fat":number},"feedback":string,"confidence":"low|medium|high"}. If the user enters something random (not food) or unrealistic (e.g. "500kg paneer", "uranium", "a car"), set confidence to "low", set macros to 0, and make the "feedback" a funny, sarcastic roast about why that is not a valid meal, but then ask for real food. Otherwise, estimate macros based on realistic nutrition science.',
        },
        {
          role: "user",
          content: `Meal description: ${description}\nMeal type: ${
            mealType || "unknown"
          }\nGoal: ${goal || "unspecified"}`,
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) {
      return NextResponse.json({
        ok: false,
        message: "I couldn't read that meal. Try again.",
      });
    }

    let parsed: {
      nutrients?: Record<string, unknown>;
      feedback?: unknown;
      confidence?: unknown;
    };
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.error("/api/diet-entry/analyze JSON error", error, raw);
      return NextResponse.json({
        ok: false,
        message: "Nutrition coach could not parse that. Rephrase the meal.",
      });
    }

    const nutrients = parsed?.nutrients ?? {};

    return NextResponse.json({
      ok: true,
      nutrients: {
        calories: sanitizeNumber(nutrients.calories),
        protein: sanitizeNumber(nutrients.protein),
        carbs: sanitizeNumber(nutrients.carbs),
        fat: sanitizeNumber(nutrients.fat),
      },
      feedback:
        typeof parsed?.feedback === "string"
          ? parsed.feedback.slice(0, 280)
          : "Looks solid. Keep portions aligned with your plan.",
      confidence: sanitizeConfidence(parsed?.confidence),
    });
  } catch (error) {
    console.error("POST /api/diet-entry/analyze error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Nutrition coach is offline. Try again shortly.",
      },
      { status: 500 }
    );
  }
}
