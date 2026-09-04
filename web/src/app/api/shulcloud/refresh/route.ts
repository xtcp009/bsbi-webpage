import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getShulcloudSnapshot, SHULCLOUD_TAG } from "@/lib/shulcloud";

export const dynamic = "force-dynamic";

function isSafeNextPath(next: string | null): next is string {
  return Boolean(next && next.startsWith("/") && !next.startsWith("//"));
}

export async function GET(request: Request) {
  revalidateTag(SHULCLOUD_TAG, { expire: 0 });
  const snapshot = await getShulcloudSnapshot();

  const incoming = new URL(request.url);
  const next = incoming.searchParams.get("next");
  if (isSafeNextPath(next)) {
    return NextResponse.redirect(new URL(next, incoming.origin));
  }

  return NextResponse.json({
    ok: snapshot.ok,
    revalidated: SHULCLOUD_TAG,
    fetchedAt: snapshot.fetchedAt,
  });
}
