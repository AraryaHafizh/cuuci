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
import { useHistory } from "@/hooks/worker/useHistory";
import { taskHistory } from "../../worker/tasks/data";

export function TaskTable() {
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
          <TableHead>Task ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Completed At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {taskHistory.map((task) => (
          <TableRow key={task.id} className="border-none">
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell>{task.userName}</TableCell>
            <TableCell>
              {task.items.reduce((sum, item) => sum + item.qty, 0)} items
            </TableCell>
            <TableCell className="capitalize">{task.status}</TableCell>
            <TableCell>{new Date(task.completedAt).toLocaleString()}</TableCell>
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
