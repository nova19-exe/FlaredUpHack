"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assets } from "@/lib/data";
import { ArrowDown, Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";

const tradeSchema = z.object({
  fromToken: z.string().min(1, "Please select a token."),
  toToken: z.string().min(1, "Please select a token."),
  fromAmount: z.coerce.number().positive("Amount must be positive."),
  slippage: z.string(),
}).refine(data => data.fromToken !== data.toToken, {
    message: "Tokens must be different.",
    path: ["toToken"],
});

type TradeSchema = z.infer<typeof tradeSchema>;

const tokenAssets = assets.filter(a => !['USDT', 'USDC', 'DAI'].includes(a.ticker));

export function TradeForm() {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const { toast } = useToast();
  const form = useForm<TradeSchema>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      fromToken: "FLR",
      toToken: "BTC",
      fromAmount: 0,
      slippage: "0.5",
    },
  });

  function onSubmit(data: TradeSchema) {
    console.log(data);
    toast({
        title: "Trade Confirmed",
        description: `Swapping ${data.fromAmount} ${data.fromToken} for ${data.toToken}.`,
    });
    // Here you would call a function to execute the trade on-chain.
  }
  
  const fromToken = form.watch("fromToken");
  const toToken = form.watch("toToken");
  const fromAmount = form.watch("fromAmount");

  const fromAsset = assets.find(a => a.ticker === fromToken);
  const toAsset = assets.find(a => a.ticker === toToken);
  
  const toAmount = fromAsset && toAsset && fromAmount > 0 ? (fromAmount * fromAsset.price) / toAsset.price : 0;

  return (
    <Card className="h-full">
        <CardHeader>
            <CardTitle>Trade</CardTitle>
            <CardDescription>Swap tokens on the Flare Network.</CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <Tabs defaultValue="swap" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="swap">Swap</TabsTrigger>
                            <TabsTrigger value="limit" disabled>Limit (Soon)</TabsTrigger>
                        </TabsList>
                        <TabsContent value="swap" className="pt-4 space-y-4">
                            <div className="grid gap-2 p-4 border rounded-lg relative">
                               <FormField
                                    control={form.control}
                                    name="fromAmount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel>You pay</FormLabel>
                                                <span className="text-xs text-muted-foreground">Balance: ...</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FormControl>
                                                    <Input type="number" placeholder="0.0" {...field} className="text-2xl border-none p-0 h-auto focus-visible:ring-0" />
                                                </FormControl>
                                                <FormField
                                                    control={form.control}
                                                    name="fromToken"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-[120px]">
                                                                    <SelectValue placeholder="Select" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {tokenAssets.map(asset => (
                                                                    <SelectItem key={asset.ticker} value={asset.ticker}>{asset.ticker}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                             <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-background border rounded-full">
                                    <ArrowDown className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="grid gap-2 p-4 border rounded-lg">
                                <FormItem>
                                    <div className="flex justify-between items-center">
                                        <FormLabel>You receive</FormLabel>
                                         <span className="text-xs text-muted-foreground">~${(toAmount * (toAsset?.price ?? 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input type="number" readOnly value={toAmount.toFixed(5)} className="text-2xl border-none p-0 h-auto focus-visible:ring-0" />
                                        <FormField
                                            control={form.control}
                                            name="toToken"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-[120px]">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {tokenAssets.map(asset => (
                                                            <SelectItem key={asset.ticker} value={asset.ticker}>{asset.ticker}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </FormItem>
                            </div>
                        </TabsContent>
                    </Tabs>
                    
                    <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex justify-between">
                            <span>Gas Fee</span>
                            <span>~0.05 FLR</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span>Slippage</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1 h-auto p-1">
                                        {form.watch('slippage')}%
                                        <Settings className="h-3 w-3" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-60">
                                   <FormField
                                        control={form.control}
                                        name="slippage"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel>Slippage Tolerance</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex space-x-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <Button size="sm" variant={field.value === '0.5' ? 'secondary' : 'outline'} onClick={() => field.onChange("0.5")} type="button">0.5%</Button>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <Button size="sm" variant={field.value === '1' ? 'secondary' : 'outline'} onClick={() => field.onChange("1")} type="button">1%</Button>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <Input type="number" step="0.1" className="w-20 h-9" placeholder="Custom" onChange={e => field.onChange(e.target.value)} />
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Confirm Trade</Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
  );
}
