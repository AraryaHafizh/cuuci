"use client";

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
import { dummyOutlets } from "../../data";
import { Button } from "@/components/ui/button";

export default function OutletsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>No</TableHead>
          <TableHead>Outlet ID</TableHead>
          <TableHead>Outlet Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Total Orders</TableHead>
          <TableHead>Active Workers</TableHead>
          <TableHead>Active Drivers</TableHead>
          <TableHead>Service Radius</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dummyOutlets.map((outlet, i) => (
          <TableRow key={outlet.outletId} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{outlet.outletId}</TableCell>
            <TableCell>{outlet.outletName}</TableCell>
            <TableCell>{outlet.address}</TableCell>
            <TableCell>{outlet.totalOrders}</TableCell>
            <TableCell>{outlet.activeWorkers}</TableCell>
            <TableCell>{outlet.activeDrivers}</TableCell>
            <TableCell>{outlet.serviceRadius}</TableCell>
            <TableCell>{outlet.status}</TableCell>
            <TableCell>{<Button variant={"outline"}>Edit</Button>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PaginationOutlets() {
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
