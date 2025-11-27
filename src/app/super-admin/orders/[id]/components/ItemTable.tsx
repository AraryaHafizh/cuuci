"use client";

import { dummyUsers } from "@/app/super-admin/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ItemTable() {
  return (
    <section className="rounded-2xl border bg-(--container-bg) p-5">
      <p>Order Items</p>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-none">
            <TableHead>No</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Quantity</TableHead>
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
    </section>
  );
}
