import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { insertIdeas } from "../mutations";
import type { Route } from "./+types/generate-idea-page";
import { adminClient } from "~/supa-admin.server";

const openai = new OpenAI();

const IdeaSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .describe("A short description of the idea. 100 characters max."),
  problem: z.string(),
  solution: z.string(),
  category: z.enum([
    "mindset",
    "wellness",
    "focus",
    "routine",
    "reflection",
    "learning",
    "relationships",
    "energy",
    "other",
  ]),
});

const ResponseSchema = z.object({
  ideas: z.array(IdeaSchema).length(10),
});

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return JSON.stringify(error);
}

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get(process.env.HEADER_SECRET_KEY!);
  if (!header || header !== process.env.HEADER_SECRET_VAL) {
    return new Response(null, { status: 404 });
  }
  try {
    const completion = await openai.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content:
            "Generate practical personal-growth ideas for app_lause, a community where people claim small growth actions, complete them, and receive applause for meaningful progress.",
        },
        {
          role: "user",
          content:
            "Each idea should help one person build a better habit, reflect more honestly, improve focus, care for their wellbeing, learn consistently, strengthen relationships, or reset their daily routine.",
        },
        {
          role: "user",
          content:
            "Give me 10 concise ideas. Write each title as an actionable personal challenge that can be completed and applauded, not as a startup pitch or generic self-help slogan.",
        },
      ],
      response_format: zodResponseFormat(ResponseSchema, "applause_ideas"),
    });
    const ideas = completion.choices[0].message.parsed?.ideas.map((idea) =>
      idea.description.trim()
    );
    if (!ideas || ideas.length === 0) {
      return {
        ok: false,
        error: "No ideas generated",
      };
    }
    await insertIdeas(adminClient, ideas);
    return {
      ok: true,
      ideas,
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
};
