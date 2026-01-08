"use client";

import { Button } from "@/components/ui/button";
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
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export function HistoryOrderTable() {
  const router = useRouter();
  const nf = new Intl.NumberFormat("id-ID");
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
          <TableHead>Status</TableHead>
          <TableHead>Total Weight</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order: any, i: number) => (
          <TableRow key={i} className="border-none">
            <TableCell className="font-medium">{order.orderNumber}</TableCell>
            <TableCell>{formatDate(order.createdAt, "date")}</TableCell>
            <TableCell>{formatOrderStatus(order.status)}</TableCell>
            <TableCell>{order.totalWeight} kg</TableCell>
            <TableCell>{formatOrderStatus(order.payment.status)}</TableCell>
            <TableCell className="text-right">
              Rp {nf.format(order.totalPrice)}
            </TableCell>
            <TableCell>
              <Button
                size={"icon-sm"}
                variant="outline"
                onClick={() => router.push(`/dashboard/orders/${order.id}`)}
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
