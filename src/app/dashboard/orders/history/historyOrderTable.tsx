"use client";

import { LoadingScreen } from "@/components/ui/loading-animation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHistory } from "@/hooks/user/useHistory";
import { formatDate, formatOrderStatus } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { orderHistory } from "./data";

export function HistoryOrderTable() {
  const router = useRouter();
  const { data, isPending } = useHistory();

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
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderHistory.map((order) => (
          <TableRow key={order.orderId} className="border-none">
            <TableCell className="font-medium">{order.orderId}</TableCell>
            <TableCell>{formatDate(order.orderDate, "date")}</TableCell>
            <TableCell>{order.serviceType}</TableCell>
            <TableCell>{formatOrderStatus(order.status)}</TableCell>
            <TableCell>{order.paymentStatus}</TableCell>
            <TableCell className="text-right">${order.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PaginationHistory() {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
