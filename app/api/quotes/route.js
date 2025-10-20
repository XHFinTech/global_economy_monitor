import { NextResponse } from "next/server";
import { fetchQuotes } from "../../../lib/providers/yahoo";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbolsParam = searchParams.get("symbols") || "";
  const symbols = symbolsParam.split(",").map(s => s.trim()).filter(Boolean);
  if (!symbols.length) {
    return NextResponse.json({ error: "symbols required" }, { status: 400 });
  }
  try {
    const data = await fetchQuotes(symbols);
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
