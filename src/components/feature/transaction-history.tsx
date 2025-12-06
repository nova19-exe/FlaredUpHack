import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transactions } from "@/lib/data";

export function TransactionHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.slice(0, 5).map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="font-medium capitalize">{item.type}: {item.asset}</div>
              <div className="text-xs text-muted-foreground">{item.date}</div>
            </TableCell>
            <TableCell className="text-right">
              <div className={`font-medium ${item.type === 'buy' ? 'text-positive' : 'text-negative'}`}>
                {item.type === 'buy' ? '+' : '-'}{item.amount.toFixed(4)} {item.asset}
              </div>
              <div className="text-xs text-muted-foreground">${item.value.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
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
