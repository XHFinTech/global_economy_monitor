"use client";
import Sparkline from "./Sparkline";

export default function TickerRow({ item }) {
  const { symbol, shortName, price, change, changePercent, currency, spark } = item;
  const up = change >= 0;
  return (
    <div className="row">
      <div className="ticker">{symbol}</div>
      <div title={shortName || symbol}>{shortName || "—"}</div>
      <div className={up ? "positive" : "negative"}>{price != null ? `${price.toLocaleString(undefined,{maximumFractionDigits:2})}` : "—"} {currency || ""}</div>
      <div className={up ? "positive" : "negative"}>{change != null ? `${up?"+":""}${change.toFixed(2)} (${(changePercent*100).toFixed(2)}%)` : "—"}</div>
      <div>
        <Sparkline data={spark?.close || []} />
      </div>
    </div>
  );
}
