"use client"
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadWidget = () => {
    if (!containerRef.current) return;

    // Reset container so widget reloads properly
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      allow_symbol_change: true,
      interval: "15",
      symbol: "BITSTAMP:BTCUSD",
      theme: "dark",
      timezone: "Etc/UTC",
    });

    containerRef.current.appendChild(script);

    // force chart resize
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  };

  useEffect(() => {
    loadWidget();

    const observer = new ResizeObserver(() => {
      loadWidget();
    });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
      className="tradingview-widget-container"
    />
  );
}

export default memo(TradingViewWidget);
