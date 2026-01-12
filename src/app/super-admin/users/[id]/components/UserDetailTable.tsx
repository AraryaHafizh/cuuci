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
  meta,
  setPage,
}: {
  userId: string;
  role: string;
  tasks: any;
  meta: any;
  setPage: any;
}) {
  const tabKey = tabKeys[role as keyof typeof tabKeys];
  const [tab, setTab] = useState(tabKey[0]);
  const [attendancePage, setAttendancePage] = useState(1);

  const { data: attendances, isPending } = useLog({
    id: userId,
    params: { attendancePage },
  });

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

      <PaginationUsers
        meta={tab === "attendance" ? attendances?.meta || {} : meta}
        onPageChange={tab === "attendance" ? setAttendancePage : setPage}
      />
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
  const nf = new Intl.NumberFormat("id-ID");

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
        {tab === "orders" &&
          tasks.map((order: any, i: number) => (
            <TableRow key={i} className="border-none">
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{formatOrderStatus(order.status)}</TableCell>
              <TableCell>{nf.format(order.totalPrice)}</TableCell>
              <TableCell>{order.totalWeight} kg</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>
                {order.payment?.status
                  ? formatOrderStatus(order.payment.status)
                  : "Pending"}
              </TableCell>
            </TableRow>
          ))}
        {tab === "deliveries" &&
          tasks.map((delivery: any, i: number) => (
            <TableRow key={i} className="border-none">
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{delivery.order.orderNumber}</TableCell>
              <TableCell>{formatOrderStatus(delivery.type)}</TableCell>
              <TableCell>{delivery.order.customer.name}</TableCell>
              <TableCell className="capitalize">
                {formatOrderStatus(delivery.status)}
              </TableCell>
              <TableCell>{formatDate(delivery.createdAt)}</TableCell>
              <TableCell>{formatDate(delivery.updatedAt)}</TableCell>
              <TableCell>{delivery.numberOfItems}</TableCell>
              <TableCell>{delivery.totalWeight}</TableCell>
              <TableCell>{delivery.distance}</TableCell>
              <TableCell>{delivery.duration}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export function PaginationUsers({
  meta,
  onPageChange,
}: {
  meta: {
    page: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}) {
  const { page, totalPages } = meta;

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && onPageChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => onPageChange(p)}
                className={"pointer-events-none opacity-50"}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && onPageChange(page + 1)}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
