import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { holdings } from "@/lib/data";
import { cn } from "@/lib/utils";

const AssetIcon = ({ ticker }: { ticker: string }) => {
  return (
    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold">
      {ticker.charAt(0)}
    </div>
  );
};


export function Holdings() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead className="text-right">Balance</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdings.map((item) => (
          <TableRow key={item.ticker}>
            <TableCell>
                <div className="flex items-center gap-3">
                    <AssetIcon ticker={item.ticker} />
                    <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.ticker}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell className="text-right">
                <div>{item.balance.toFixed(4)}</div>
            </TableCell>
            <TableCell className="text-right">
                <div>${(item.balance * item.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
