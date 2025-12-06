"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import TradingViewWidget from "@/components/TradingView/TradingViewWidget"

export function CandlestickChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>BTC/FLR Chart</CardTitle>
        <CardDescription>
          Live price data from TradingView.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-96 w-full">
        <TradingViewWidget />
      </CardContent>
    </Card>
  )
}