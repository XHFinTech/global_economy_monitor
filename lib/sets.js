export const PRESET_SETS = {
  indices: {
    label: "Global Indices",
    symbols: [
      "^GSPC", // S&P 500
      "^NDX",  // Nasdaq 100
      "^DJI",  // Dow Jones
      "^RUT",  // Russell 2000
      "^N225", // Nikkei 225
      "^HSI",  // Hang Seng
      "^STOXX50E", // Euro Stoxx 50
      "^FTSE", // FTSE 100
      "^GDAXI", // DAX
      "^FCHI" // CAC 40
    ]
  },
  fx: {
    label: "FX Majors",
    symbols: [
      "EURUSD=X",
      "USDJPY=X",
      "GBPUSD=X",
      "AUDUSD=X",
      "USDCAD=X",
      "USDCHF=X",
      "NZDUSD=X"
    ]
  },
  crypto: {
    label: "Crypto",
    symbols: [
      "BTC-USD",
      "ETH-USD",
      "SOL-USD",
      "BNB-USD",
      "XRP-USD"
    ]
  },
  commodities: {
    label: "Commodities",
    symbols: [
      "GC=F", // Gold
      "SI=F", // Silver
      "CL=F", // Crude Oil WTI
      "NG=F", // Natural Gas
      "HG=F"  // Copper
    ]
  },
};
