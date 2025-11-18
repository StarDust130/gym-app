import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getExerciseTip(name: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `Give exactly 3 beginner-friendly bullet tips for the exercise "${name}".
Each bullet must:
- use 5-10 super simple words (with emoji 1-2 cool emoji).
- mention the machine or body position if it matters.
- explain the action in everyday language.
Return plain text with each bullet on its own line starting with "- ". No intro or outro.`,
      },
    ],
    max_completion_tokens: 80,
    temperature: 0.4,
  });

  return completion.choices[0].message?.content;
}
