import yahooFinance from "yahoo-finance2";
import { getCache, setCache } from "../cache";

const TTL_SHORT = 20 * 1000; // 20s for quotes
const TTL_SPARK = 60 * 1000; // 60s for spark lines

export async function fetchQuotes(symbols) {
  const key = `quotes:${symbols.sort().join(',')}`;
  const cached = getCache(key);
  if (cached) return cached;
  const res = await yahooFinance.quote(symbols);
  const data = Array.isArray(res) ? res : [res];
  setCache(key, data, TTL_SHORT);
  return data;
}

export async function fetchSpark(symbols, { range = "1d", interval = "5m" } = {}) {
  const key = `spark:${symbols.sort().join(',')}:${range}:${interval}`;
  const cached = getCache(key);
  if (cached) return cached;
  const spark = await yahooFinance.spark(symbols, { range, interval });
  // Normalize into map by symbol for quick lookup
  const map = {};
  for (const s of spark) {
    map[s.symbol] = s;
  }
  setCache(key, map, TTL_SPARK);
  return map;
}
