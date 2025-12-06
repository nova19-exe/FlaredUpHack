"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { runHedgeAnalysis } from "@/app/actions";
import { hedgingToolSchema, type HedgingToolSchema } from "@/lib/schemas";
import type { AutomatedHedgingToolOutput } from "@/ai/flows/automated-hedging-tool";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, PartyPopper, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const hedgeAssetOptions = ['USDT', 'USDC', 'DAI', 'XRP'] as const;

export function HedgingTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AutomatedHedgingToolOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<HedgingToolSchema>({
    resolver: zodResolver(hedgingToolSchema),
    defaultValues: {
      btcPrice: 67123.45,
      entryPrice: 70000.00,
      triggerThreshold: 10,
      hedgePercentage: 30,
      hedgeAssets: ["USDC"],
      autoExecute: false,
      userSmartAccountAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    },
  });

  async function onSubmit(data: HedgingToolSchema) {
    setIsLoading(true);
    setResult(null);

    const response = await runHedgeAnalysis(data);

    if (response.success && response.result) {
      setResult(response.result);
      toast({
        title: "Analysis Successful",
        description: response.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: response.message,
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Hedging Tool</CardTitle>
          <CardDescription>
            Configure your hedging parameters and let the AI analyze your BTC position for potential downside protection.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="btcPrice" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current BTC Price ($)</FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="entryPrice" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your BTC Entry Price ($)</FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="triggerThreshold" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Threshold (%)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormDescription>Hedge when BTC drops by this percentage.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="hedgePercentage" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hedge Percentage (%)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormDescription>The percentage of your BTC to convert.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
               <FormField control={form.control} name="hedgeAssets" render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Hedge Assets</FormLabel>
                      <FormDescription>
                        Select assets to hedge your BTC into.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hedgeAssetOptions.map((item) => (
                      <FormField key={item} control={form.control} name="hedgeAssets" render={({ field }) => (
                        <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      )} />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField control={form.control} name="userSmartAccountAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Flare Smart Account Address</FormLabel>
                  <FormControl><Input placeholder="0x..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="autoExecute" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Auto-Execute Hedge</FormLabel>
                    <FormDescription>
                      Automatically execute the swap when trigger conditions are met.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Run Hedge Analysis
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            {result.hedgeProposed ? (
                <Alert>
                    <PartyPopper className="h-4 w-4" />
                    <AlertTitle>Hedge Proposed!</AlertTitle>
                    <AlertDescription>{result.message}</AlertDescription>
                </Alert>
            ) : (
                <Alert variant="default">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Hedge Proposed</AlertTitle>
                    <AlertDescription>{result.message}</AlertDescription>
                </Alert>
            )}

            {result.swapDetails && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Swap Details</h4>
                <div className="p-4 rounded-md bg-muted text-sm font-mono">
                  <pre className="whitespace-pre-wrap">{result.swapDetails}</pre>
                </div>
              </div>
            )}

            {result.transactionDetails && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Transaction Details</h4>
                 <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Auto-Execution Enabled</AlertTitle>
                    <AlertDescription className="font-mono text-xs">
                        <pre className="whitespace-pre-wrap">{result.transactionDetails}</pre>
                    </AlertDescription>
                </Alert>
              </div>
            )}

          </CardContent>
        </Card>
      )}
    </div>
  );
}
