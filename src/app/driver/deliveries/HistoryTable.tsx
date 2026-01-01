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
import { useHistory } from "@/hooks/driver/useHIstory";
import { formatDate, formatOrderStatus } from "@/lib/utils";

export function DeliveryTable() {
  const { data, isPending } = useHistory();

  if (isPending)
    return (
      <div className="h-[560px]">
        <LoadingScreen isDashboard={true} />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="mt-10 flex h-[560px] items-center justify-center rounded-2xl border">
        <p className="opacity-50">no history...</p>
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Picked Up At</TableHead>
          <TableHead>Delivered At</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Total Time</TableHead>
          <TableHead className="text-center">Proof</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((delivery: any, i: number) => (
          <TableRow key={i} className="border-none">
            <TableCell className="font-medium">
              {delivery.orderNumber}
            </TableCell>
            <TableCell>{delivery.customer.name}</TableCell>
            <TableCell className="capitalize">
              {formatOrderStatus(delivery.status)}
            </TableCell>
            <TableCell>{formatDate(delivery.pickupTime)}</TableCell>
            <TableCell>{formatDate(delivery.deliveryTime)}</TableCell>
            <TableCell>{delivery.numberOfItems}</TableCell>
            <TableCell>{delivery.totalWeight}</TableCell>
            <TableCell>{delivery.distance}</TableCell>
            <TableCell>{delivery.duration}</TableCell>
            <TableCell>
              {
                <Button variant={"ghost"} size={"sm"}>
                  view
                </Button>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PaginationDelivery() {
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
