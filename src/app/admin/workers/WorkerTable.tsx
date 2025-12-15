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
import { useUsers } from "@/hooks/user/useUser";
import { useSession } from "next-auth/react";
import { LoadingScreen } from "@/components/ui/loading-animation";

export function WorkerTable() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { data, isPending } = useUsers({
    params: { outletId: session!.user.outletId },
  });

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
          <TableHead>Order ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Service Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyHistory.map((order) => (
          <TableRow key={order.orderId} className="border-none">
            <TableCell className="font-medium">{order.orderId}</TableCell>
            <TableCell>{formatDate(order.orderDate, "date")}</TableCell>
            <TableCell>{order.serviceType}</TableCell>
            <TableCell>{formatOrderStatus(order.status)}</TableCell>
            <TableCell>{order.paymentStatus}</TableCell>
            <TableCell>${order.totalAmount}</TableCell>
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
