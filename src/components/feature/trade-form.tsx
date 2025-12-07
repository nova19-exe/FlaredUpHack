"use client";

import { useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ethers } from "ethers";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assets } from "@/lib/data";
import { ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { getSmartAccount, SMART_ACCOUNT_ADDRESS } from "@/lib/contract";

const FALLBACK_TEST_TOKEN = "0x791ac73D201EC4C8803DeA35Ad12C99a68Cb9306";

// ✅ ERC20 ABI
const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
];

// ✅ Flare Registry
const FLARE_REGISTRY = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

const REGISTRY_ABI = [
  {
    inputs: [{ internalType: "string", name: "name", type: "string" }],
    name: "getContractAddressByName",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

async function getRealTokenAddress(symbol: string, signer: ethers.Signer) {
  const registry = new ethers.Contract(FLARE_REGISTRY, REGISTRY_ABI, signer);
  let addr = "";

  if (symbol === "FLR") {
    addr = await registry.getContractAddressByName("WFLR");
    if (addr === ethers.ZeroAddress) addr = FALLBACK_TEST_TOKEN;
  } else if (symbol === "XRP") {
    addr = await registry.getContractAddressByName("FXRP");
  } else if (symbol === "BTC") {
    addr = await registry.getContractAddressByName("FBTC");
  } else {
    throw new Error("Unsupported token selected");
  }

  if (!addr || addr === ethers.ZeroAddress) {
    throw new Error(`Registry returned ZERO address for ${symbol}`);
  }

  return addr;
}

// ===============================

const tradeSchema = z
  .object({
    fromToken: z.string(),
    toToken: z.string(),
    fromAmount: z.coerce.number(),
    slippage: z.string(),
  })
  .refine((data) => data.fromToken !== data.toToken, {
    message: "Tokens must be different.",
    path: ["toToken"],
  });

type TradeSchema = z.infer<typeof tradeSchema>;

const tokenAssets = assets.filter(
  (a) => !["USDT", "USDC", "DAI"].includes(a.ticker)
);

// ===============================

export function TradeForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [previewAmount, setPreviewAmount] = useState(0);

  const form = useForm<TradeSchema>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      fromToken: "FLR",
      toToken: "BTC",
      fromAmount: 0,
      slippage: "0.5",
    },
  });

  const fromToken = useWatch({ control: form.control, name: "fromToken" });
  const toToken = useWatch({ control: form.control, name: "toToken" });

  const toAmount = useMemo(() => {
    const fromAsset = assets.find((a) => a.ticker === fromToken);
    const toAsset = assets.find((a) => a.ticker === toToken);

    const fromPrice = Number(fromAsset?.price || 0);
    const toPrice = Number(toAsset?.price || 0);

    if (!fromAsset || !toAsset || previewAmount <= 0 || toPrice <= 0) {
      return 0;
    }

    return (previewAmount * fromPrice) / toPrice;
  }, [fromToken, toToken, previewAmount]);

  async function onSubmit(data: TradeSchema) {
    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );
      const signer = await provider.getSigner();

      const fromTokenAddress = await getRealTokenAddress(
        data.fromToken,
        signer
      );

      const amountParsed = ethers.parseUnits(
        data.fromAmount.toString(),
        18
      );

      const erc20 = new ethers.Contract(
        fromTokenAddress,
        ERC20_ABI,
        signer
      );

      const smartAccount = await getSmartAccount();

      await erc20.approve(SMART_ACCOUNT_ADDRESS, amountParsed);

      const tx = await smartAccount.depositCollateral(
        fromTokenAddress,
        amountParsed,
        { value: 0 }
      );

      await tx.wait();

      toast({ title: "✅ Trade Executed" });
      form.reset();
      setPreviewAmount(0);
    } catch (err: any) {
      toast({ title: "❌ Failed", description: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Trade</CardTitle>
        <CardDescription>Swap tokens on the Flare Network.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <Tabs defaultValue="swap">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="swap">Swap</TabsTrigger>
                <TabsTrigger value="limit" disabled>
                  Limit (Soon)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="swap" forceMount className="space-y-4 pt-4">
              {/* YOU PAY */}
                <div className="grid gap-2 p-4 border rounded-lg relative">
                  <FormField
                    control={form.control}
                    name="fromAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>You pay</FormLabel>

                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.0"
                              value={field.value ?? ""}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                field.onChange(val);
                                setPreviewAmount(val);
                              }}
                            />
                          </FormControl>

                          {/* ✅ FIXED FROM TOKEN SELECT */}
                          <FormField
                            control={form.control}
                            name="fromToken"
                            render={({ field }) => (
                                <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                              
                                <SelectContent
                                  onCloseAutoFocus={(e) => e.preventDefault()}
                                >
                                  {tokenAssets.map((asset) => (
                                    <SelectItem key={asset.ticker} value={asset.ticker}>
                                      {asset.ticker}
                                    </SelectItem>
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

                {/* YOU RECEIVE */}
                <div className="grid gap-2 p-4 border rounded-lg">
                  <FormLabel>You receive</FormLabel>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      readOnly
                      value={toAmount ? toAmount.toFixed(6) : ""}
                    />

                    {/* ✅ FIXED TO TOKEN SELECT */}
                    <FormField
                      control={form.control}
                      name="toToken"
                      render={({ field }) => (
                        <Select
  value={field.value}
  onValueChange={field.onChange}
>
  <FormControl>
    <SelectTrigger className="w-[120px]">
      <SelectValue placeholder="Select" />
    </SelectTrigger>
  </FormControl>

  <SelectContent
    onCloseAutoFocus={(e) => e.preventDefault()}
  >
    {tokenAssets.map((asset) => (
      <SelectItem key={asset.ticker} value={asset.ticker}>
        {asset.ticker}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Confirm Trade"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
