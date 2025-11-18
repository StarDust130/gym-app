import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getExerciseTip(name: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `Give exactly 2 beginner-friendly bullet tips for the exercise "${name}".
Each bullet must:
- end with an emoji followed by 4-10 simple words that explain how to perform it.
- avoid technical jargon and keep it casual.
Return plain text with each bullet on its own line starting with "- ". No intro or outro. use super simple english and emoji too.`,
      },
    ],
    max_completion_tokens: 80,
    temperature: 0.4,
  });

  return completion.choices[0].message?.content;
}
