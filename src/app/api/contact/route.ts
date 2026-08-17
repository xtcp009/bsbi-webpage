import { z } from "zod";
import { NextResponse } from "next/server";
import {
  clientKey,
  isValidEmail,
  isValidPhone,
  rateLimit,
  sanitizeMultiline,
  sanitizeText,
} from "@/lib/sanitize";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  topic: z.string().optional(),
  message: z.string(),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = [site.url, "http://localhost:3000", "http://127.0.0.1:3000"];
  if (origin && !allowed.some((item) => origin === item || origin.startsWith(item))) {
    return NextResponse.json({ ok: false, error: "Invalid origin." }, { status: 403 });
  }

  const key = clientKey(request.headers);
  if (!rateLimit(key)) {
    return NextResponse.json(
      { ok: false, error: "Please wait before sending another message, or call the office." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
  }

  if (sanitizeText(parsed.data.company, 80)) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitizeText(parsed.data.name, 80);
  const email = sanitizeText(parsed.data.email, 120);
  const phone = sanitizeText(parsed.data.phone ?? "", 24);
  const topic = sanitizeText(parsed.data.topic ?? "General", 60);
  const message = sanitizeMultiline(parsed.data.message, 2000);

  if (name.length < 2 || message.length < 10 || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please include a name, valid email, and a short message." }, { status: 400 });
  }
  if (phone && !isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "That phone number does not look valid." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          topic,
          message,
          source: site.url,
        }),
      });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Could not deliver the message. Please call the office." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
