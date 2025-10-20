"use client";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { FixedSizeList as List } from "react-window";
import dayjs from "dayjs";
import { PRESET_SETS } from "../lib/sets";
import TickerRow from "../components/TickerRow";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Page() {
  const presetKeys = Object.keys(PRESET_SETS);
  const [preset, setPreset] = useState(presetKeys[0]);
  const [custom, setCustom] = useState("");
  const symbols = useMemo(() => {
    const base = PRESET_SETS[preset].symbols;
    const extra = custom
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return Array.from(new Set([...base, ...extra]));
  }, [preset, custom]);

  const qs = encodeURIComponent(symbols.join(","));
  const { data: qRes } = useSWR(
    symbols.length ? `/api/quotes?symbols=${qs}` : null,
    fetcher,
    { refreshInterval: 20000, revalidateOnFocus: false }
  );
  const { data: sRes } = useSWR(
    symbols.length ? `/api/spark?symbols=${qs}&range=1d&interval=5m` : null,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );

  const items = useMemo(() => {
    const quotes = qRes?.data || [];
    const sparkMap = sRes?.data || {};
    return quotes.map((q) => {
      const price = q.regularMarketPrice ?? q.postMarketPrice ?? q.preMarketPrice ?? null;
      const change = q.regularMarketChange ?? null;
      const changePercent = q.regularMarketChangePercent ?? null;
      const spark = sparkMap[q.symbol];
      return {
        symbol: q.symbol,
        shortName: q.shortName || q.longName || q.symbol,
        currency: q.currency,
        price,
        change,
        changePercent,
        spark,
      };
    });
  }, [qRes, sRes]);

  const status = useMemo(() => {
    const t = dayjs().format("YYYY-MM-DD HH:mm:ss");
    return `Updated: ${t} | Symbols: ${symbols.length}`;
  }, [symbols, qRes, sRes]);

  return (
    <div className="container">
      <header className="header">
        <div className="title">Global Economic & Market Trend Monitor</div>
        <div className="controls">
          <select className="select" value={preset} onChange={(e) => setPreset(e.target.value)}>
            {presetKeys.map((k) => (
              <option key={k} value={k}>{PRESET_SETS[k].label}</option>
            ))}
          </select>
          <input
            className="select"
            placeholder="Add symbols, comma-separated (e.g. TSLA,AAPL)"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        </div>
      </header>

      <div className="grid">
        <aside className="panel">
          <div className="section-title">Presets</div>
          <ul>
            {presetKeys.map((k) => (
              <li key={k} style={{ margin: "6px 0" }}>
                <button className="button" onClick={() => setPreset(k)}>{PRESET_SETS[k].label}</button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="panel">
          <div className="section-title">{status}</div>
          <div className="list">
            <div className="row" style={{ fontWeight: 700 }}>
              <div>Symbol</div>
              <div>Name</div>
              <div>Price</div>
              <div>Change</div>
              <div>Spark</div>
            </div>
            <List
              height={Math.max(200, typeof window === 'undefined' ? 600 : window.innerHeight - 220)}
              itemCount={items.length}
              itemSize={56}
              width={"100%"}
            >
              {({ index, style }) => (
                <div style={style}>
                  <TickerRow item={items[index]} />
                </div>
              )}
            </List>
          </div>
          <div className="footer">Auto-refresh: quotes every 20s, spark every 60s. Data via Yahoo Finance.</div>
        </main>
      </div>
    </div>
  );
}
