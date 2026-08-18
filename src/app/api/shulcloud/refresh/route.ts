import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { SHULCLOUD_TAG } from "@/lib/shulcloud";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  revalidateTag(SHULCLOUD_TAG, { expire: 0 });
  const incoming = new URL(request.url);
  const next = incoming.searchParams.get("next") || "/";
  if (next.startsWith("/") && !next.startsWith("//")) {
    return NextResponse.redirect(new URL(next, incoming.origin));
  }
  return NextResponse.json({ ok: true, revalidated: SHULCLOUD_TAG });
}
