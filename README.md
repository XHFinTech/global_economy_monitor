# Global Economic & Market Trend Monitor

Virtualized 24/7 dashboard for global indices, FX, crypto, and commodities using Next.js + Yahoo Finance.

## Features
- Virtualized list with `react-window` for smooth performance
- Quote refresh every 20s, sparkline refresh every 60s via `SWR`
- Preset symbol sets + custom symbols input
- Server API routes with in-memory TTL cache
- No API key required for Yahoo Finance; optional providers can be added

## Stack
- Next.js App Router
- `yahoo-finance2` for market data
- `swr` for polling
- `react-window` for virtualization

## Setup
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Environment variables
Copy `.env.example` to `.env.local` if you plan to add optional providers later.
```
# Optional providers (not required for baseline app)
ALPHAVANTAGE_KEY=
FRED_API_KEY=
```

## API
- `GET /api/quotes?symbols=SYM1,SYM2,...`
- `GET /api/spark?symbols=SYM1,SYM2,...&range=1d&interval=5m`

## Notes
- Caching is in-memory on the server and resets on redeploy.
- For true 24/7 background refresh, consider:
  - Vercel Cron to pre-warm endpoints
  - A lightweight external worker hitting the APIs on intervals
