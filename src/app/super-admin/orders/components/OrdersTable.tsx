"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { dummyOrders } from "../data";
import { formatDate } from "@/lib/utils";

export default function OrdersTable() {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>No</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Outlet Name</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Total Items</TableHead>
          <TableHead>Total Weigh</TableHead>
          <TableHead>Pickup Date & Time</TableHead>
          <TableHead>Delivery Date & Time</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dummyOrders.map((order, i) => (
          <TableRow key={i} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{order.outletName}</TableCell>
            <TableCell>{order.orderStatus}</TableCell>
            <TableCell>{order.totalItems}</TableCell>
            <TableCell>{order.totalWeight}</TableCell>
            <TableCell>{formatDate(order.pickupDateTime)}</TableCell>
            <TableCell>{formatDate(order.deliveryDateTime)}</TableCell>
            <TableCell>{formatDate(order.createdAt, "date")}</TableCell>
            <TableCell>
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

export function PaginationOrders() {
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
