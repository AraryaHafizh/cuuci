"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatOrderStatus } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { dummyHistory } from "../data";
import { Info } from "lucide-react";
import { LoadingScreen } from "@/components/ui/loading-animation";

export function OrderTable({
  data,
  isPending,
}: {
  data: any;
  isPending: boolean;
}) {
  const router = useRouter();
  const nf = new Intl.NumberFormat("id-ID");

  if (isPending)
    return (
      <div className="h-[560px]">
        <LoadingScreen isDashboard={true} />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex h-[560px] items-center justify-center rounded-2xl border">
        <p className="opacity-50">no data...</p>
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>No</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Total Weight</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order: any, i: number) => (
          <TableRow key={i} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>

            <TableCell className="font-medium">{order.orderNumber}</TableCell>
            <TableCell>{order.customer.name}</TableCell>
            <TableCell>{formatDate(order.createdAt, "date")}</TableCell>
            <TableCell>{formatOrderStatus(order.status)}</TableCell>
            <TableCell>{order.invoiceUrl ? "Paid" : "Unpaid"}</TableCell>
            <TableCell>{order.totalWeight} kg</TableCell>
            <TableCell>Rp {nf.format(order.totalPrice)}</TableCell>
            <TableCell className="w-10">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`orders/${order.orderId}`)}
              >
                <Info />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
