// Simple in-memory TTL cache for server runtime
const store = new Map();

export function getCache(key) {
  const hit = store.get(key);
  if (!hit) return null;
  const { expiry, value } = hit;
  if (Date.now() > expiry) {
    store.delete(key);
    return null;
  }
  return value;
}

export function setCache(key, value, ttlMs) {
  store.set(key, { value, expiry: Date.now() + ttlMs });
}
