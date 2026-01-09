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
import { formatDate, formatOrderStatus } from "@/lib/utils";

export function TaskTable({
  data,
  isPending,
}: {
  data: any;
  isPending: boolean;
}) {
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
          <TableHead>No</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Station</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Take at</TableHead>
          <TableHead>Completed At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((task: any, i: number) => (
          <TableRow key={task.id} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{task.order.orderNumber}</TableCell>
            <TableCell>{formatOrderStatus(task.station)}</TableCell>
            <TableCell>{formatOrderStatus(task.status)}</TableCell>
            <TableCell>{formatDate(task.createdAt)}</TableCell>
            <TableCell>{formatDate(task.completedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PaginationTask() {
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
