import { NextResponse } from "next/server";
import { fetchSpark } from "../../../lib/providers/yahoo";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbolsParam = searchParams.get("symbols") || "";
  const range = searchParams.get("range") || "1d";
  const interval = searchParams.get("interval") || "5m";
  const symbols = symbolsParam.split(",").map(s => s.trim()).filter(Boolean);
  if (!symbols.length) {
    return NextResponse.json({ error: "symbols required" }, { status: 400 });
  }
  try {
    const data = await fetchSpark(symbols, { range, interval });
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
