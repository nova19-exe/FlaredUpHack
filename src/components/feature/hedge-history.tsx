import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { hedgeHistory } from "@/lib/data";

export function HedgeHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hedgeHistory.slice(0, 4).map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="font-medium">{item.fromAsset} → {item.toAsset}</div>
              <div className="text-xs text-muted-foreground">{item.date}</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="font-medium">-{item.fromAmount.toFixed(4)} {item.fromAsset}</div>
              <div className="text-xs text-positive">+{item.toAmount.toLocaleString('en-US', {minimumFractionDigits: 2})} {item.toAsset}</div>
            </TableCell>
            <TableCell className="text-right">
              <Badge variant={item.status === 'Completed' ? 'success' : 'secondary'}>
                {item.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
