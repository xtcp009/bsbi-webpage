import { redirect } from "next/navigation";
import { getSiteContent } from "@/lib/cms";
import { searchSite } from "@/lib/search";

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const term = firstParam(params.q).trim();
  if (term.length < 2) redirect("/");
  const content = await getSiteContent();
  const [best] = searchSite(term, content);
  redirect(best?.href ?? `/?q=${encodeURIComponent(term)}`);
}
