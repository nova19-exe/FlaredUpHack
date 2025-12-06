import axios from "axios";

// TradingView Datafeed implementation
const Datafeed = {
  // 1. Resolve symbol (metadata about the instrument)
  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: Function,
    onResolveErrorCallback: Function
  ) => {
    try {
      const symbolInfo = {
        name: symbolName,
        ticker: symbolName,
        type: "crypto",
        session: "24x7",
        timezone: "Etc/UTC",
        minmov: 1,
        pricescale: 100,
        has_intraday: true,
        supported_resolutions: ["1", "5", "15", "60", "1D"],
      };
      onSymbolResolvedCallback(symbolInfo);
    } catch (err) {
      onResolveErrorCallback(err);
    }
  },

  // 2. Get historical bars (candles)
  getBars: async (
    symbolInfo: any,
    resolution: string,
    periodParams: any,
    onHistoryCallback: Function,
    onErrorCallback: Function
  ) => {
    try {
      const { from, to } = periodParams;
      const interval = resolution === "1D" ? "1d" : resolution + "m";

      const url = `https://api.binance.com/api/v3/klines?symbol=${symbolInfo.ticker}&interval=${interval}&startTime=${from * 1000}&endTime=${to * 1000}`;
      const response = await axios.get(url);

      const bars = response.data.map((d: any) => ({
        time: d[0],       // open time
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
        volume: parseFloat(d[5]),
      }));

      onHistoryCallback(bars, { noData: bars.length === 0 });
    } catch (err) {
      onErrorCallback(err);
    }
  },

  // 3. Subscribe to live updates
  subscribeBars: (
    symbolInfo: any,
    resolution: string,
    onRealtimeCallback: Function,
    subscribeUID: string,
    onResetCacheNeededCallback: Function
  ) => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbolInfo.ticker.toLowerCase()}@kline_${resolution}m`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const k = data.k;
      const bar = {
        time: k.t,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
        volume: parseFloat(k.v),
      };
      onRealtimeCallback(bar);
    };

    (window as any)[subscribeUID] = ws;
  },

  // 4. Unsubscribe
  unsubscribeBars: (subscriberUID: string) => {
    const ws = (window as any)[subscriberUID];
    if (ws) {
      ws.close();
      delete (window as any)[subscriberUID];
    }
  },
};

export default Datafeed;