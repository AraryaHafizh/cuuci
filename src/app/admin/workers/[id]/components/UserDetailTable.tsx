"use client";

import { dummyUsers, tabKeys, tableKeys } from "@/app/super-admin/data";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";

export default function UserDetailTable({ role }: { role: string }) {
  const tabKey = tabKeys[role as keyof typeof tabKeys];
  const [tab, setTab] = useState(tabKey[0]);

  return (
    <section className="mt-5 rounded-2xl border bg-(--container-bg) p-5">
      <div className="bg-foreground/3 mb-5 flex w-fit gap-2 rounded-xl p-2">
        {tabKey.map((key, i) => (
          <p
            key={i}
            onClick={() => setTab(key)}
            className={`${tab !== key && "opacity-50"} cursor-pointer transition-all duration-300 hover:opacity-100`}
          >
            {key}
          </p>
        ))}
      </div>
      <SummonTable role={role} tab={tab} />
      <PaginationUsers />
    </section>
  );
}

export function SummonTable({ role, tab }: { role: string; tab: string }) {
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
        {dummyUsers.map((user, i) => (
          <TableRow key={user.email} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>
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
