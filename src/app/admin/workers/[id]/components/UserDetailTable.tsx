"use client";

import { tabKeys, tableKeys } from "@/app/super-admin/data";
import { LoadingAnimation } from "@/components/ui/loading-animation";
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
import { useLog } from "@/hooks/attendance/useLog";
import { countDuration, formatDate, formatOrderStatus } from "@/lib/utils";
import { useState } from "react";

export default function UserDetailTable({
  userId,
  role,
  tasks,
}: {
  userId: string;
  role: string;
  tasks: any;
}) {
  const tabKey = tabKeys[role as keyof typeof tabKeys];
  const [tab, setTab] = useState(tabKey[0]);
  const { data: attendances, isPending } = useLog(userId);

  return (
    <section className="mt-5 rounded-2xl border bg-(--container-bg) p-5">
      <div className="mb-5 flex w-fit gap-2 p-2">
        {tabKey.map((key, i) => (
          <p
            key={i}
            onClick={() => setTab(key)}
            className={`${tab !== key && "opacity-30 hover:opacity-50"} cursor-pointer transition-all duration-300`}
          >
            {key}
          </p>
        ))}
      </div>
      <SummonTable
        role={role}
        tab={tab}
        tasks={tasks}
        attendances={attendances}
        isPending={isPending}
      />

      <PaginationUsers />
    </section>
  );
}

export function SummonTable({
  role,
  tab,
  tasks,
  attendances,
  isPending,
}: {
  role: string;
  tab: string;
  tasks: any;
  attendances: any;
  isPending: boolean;
}) {
  const tableKey = tableKeys[role as keyof typeof tableKeys];
  const labels: string[] = tableKey[tab as keyof typeof tableKey];

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>No</TableHead>
          {labels.map((key, i) => (
            <TableHead key={i}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {tab === "attendance" &&
          (isPending ? (
            <TableRow>
              <TableCell colSpan={labels.length + 1} className="h-52">
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingAnimation />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            (attendances?.data ?? []).map((attendance: any, i: number) => (
              <TableRow key={i} className="border-none">
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{attendance.id}</TableCell>
                <TableCell>{formatDate(attendance.createdAt)}</TableCell>
                <TableCell>{formatDate(attendance.checkIn)}</TableCell>
                <TableCell>{formatDate(attendance.checkOut)}</TableCell>
                <TableCell>
                  {countDuration(attendance.checkIn, attendance.checkOut)}
                </TableCell>
              </TableRow>
            ))
          ))}

        {tab === "tasks" &&
          tasks.map((task: any, i: number) => (
            <TableRow key={i} className="border-none">
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

export function PaginationUsers() {
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
