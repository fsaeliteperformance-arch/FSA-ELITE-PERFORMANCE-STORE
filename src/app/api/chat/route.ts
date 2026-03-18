/**
 * AI Chat API Route
 *
 * Accepts a POST request with a `messages` array (user / assistant turns) and
 * returns a single assistant reply via the OpenAI Chat Completions API.
 *
 * Security notes
 * --------------
 * • The OpenAI key lives in OPENAI_API_KEY (server-only env var) and is never
 *   exposed to the browser bundle.
 * • Incoming messages are validated for role and content before being forwarded.
 * • The number of forwarded messages is capped to prevent prompt-stuffing.
 */

import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGES = 20;

const SYSTEM_PROMPT = `You are the FSA Elite Performance AI assistant — a knowledgeable, motivating coach for the FSA Elite sales community.

You help with:
- Product recommendations from our store (apparel, accessories, digital playbooks, sales tools)
- Sales coaching and tips for automotive, insurance, and other sales professionals
- Information about the FSA Elite Performance community and brand
- General shopping assistance

Keep responses concise (2–4 sentences), professional, and energising. Reinforce the mindset of elite performance.`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The AI assistant is not configured yet. Please contact support.",
      },
      { status: 503 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json(
      { error: "A non-empty messages array is required." },
      { status: 400 },
    );
  }

  // Validate and sanitise each message; reject anything malformed.
  const validRoles = new Set(["user", "assistant"]);
  const sanitised: ChatMessage[] = [];
  for (const m of body.messages) {
    if (
      m !== null &&
      typeof m === "object" &&
      "role" in m &&
      "content" in m &&
      validRoles.has((m as Record<string, unknown>).role as string) &&
      typeof (m as Record<string, unknown>).content === "string" &&
      ((m as Record<string, unknown>).content as string).trim().length > 0
    ) {
      sanitised.push({
        role: (m as Record<string, unknown>).role as "user" | "assistant",
        content: (
          (m as Record<string, unknown>).content as string
        ).trim(),
      });
    }
  }

  if (sanitised.length === 0) {
    return NextResponse.json(
      { error: "No valid messages provided." },
      { status: 400 },
    );
  }

  // Cap conversation length to prevent overly large payloads.
  const capped = sanitised.slice(-MAX_MESSAGES);

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...capped],
          max_tokens: 500,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      console.error(
        "OpenAI API error:",
        response.status,
        await response.text(),
      );
      return NextResponse.json(
        {
          error:
            "The AI service is temporarily unavailable. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ message: content });
  } catch (err) {
    console.error("Chat API unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
