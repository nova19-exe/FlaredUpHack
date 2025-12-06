"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// This is mock data for the candlestick chart.
// In a real application, you would fetch this from an API.
const candlestickData = [
    { time: '10:00', open: 100, high: 105, low: 98, close: 102 },
    { time: '10:05', open: 102, high: 108, low: 101, close: 107 },
    { time: '10:10', open: 107, high: 110, low: 105, close: 109 },
    { time: '10:15', open: 109, high: 112, low: 108, close: 110 },
    { time: '10:20', open: 110, high: 115, low: 109, close: 112 },
    { time: '10:25', open: 112, high: 114, low: 111, close: 113 },
    { time: '10:30', open: 113, high: 113, low: 108, close: 109 },
    { time: '10:35', open: 109, high: 111, low: 107, close: 108 },
];

const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    const { open, close, high, low } = payload;
  
    const isBullish = close > open;
    const color = isBullish ? 'hsl(var(--positive))' : 'hsl(var(--negative))';
    const bodyHeight = Math.abs(open - close);
    const bodyY = isBullish ? y + (height - bodyHeight) : y;
  
    return (
      <g>
        <line x1={x + width / 2} y1={y} x2={x + width / 2} y2={y + height} stroke="hsl(var(--muted-foreground))" strokeWidth={1} />
        <rect x={x} y={bodyY} width={width} height={bodyHeight} fill={color} />
      </g>
    );
};
  

export function CandlestickChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>BTC/FLR Chart</CardTitle>
        <CardDescription>
          Live price data from the FTSO.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={candlestickData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
                <YAxis 
                    domain={['dataMin - 5', 'dataMax + 5']}
                    tickFormatter={(value) => `$${value}`} 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    tickLine={false} 
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="close" shape={<CustomBar />} />
            </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
