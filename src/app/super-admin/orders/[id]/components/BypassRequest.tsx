"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { CircleX, Info } from "lucide-react";
import { useState } from "react";
import { dummyBypass } from "../../data";

export function BypassRequest() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <section className="max-w-full rounded-2xl border bg-(--container-bg) p-5">
      <p>Bypass Requests</p>
      <section className="scroll-hidden flex w-full gap-5 overflow-x-auto">
        <BypassTable />
        {index !== null && <BypassDetail />}
      </section>
    </section>
  );

  function BypassTable() {
    return (
      <section className="flex-2">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-none">
              <TableHead>No</TableHead>
              <TableHead>Bypass Id</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Worker Name</TableHead>
              <TableHead>Admin Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dummyBypass.map((bypass, i) => (
              <TableRow key={i} className="border-none">
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{bypass.requestId}</TableCell>
                <TableCell>{bypass.station}</TableCell>
                <TableCell>{bypass.workerName}</TableCell>
                <TableCell>{bypass.adminName}</TableCell>
                <TableCell>{StatusBubble(bypass.status)}</TableCell>
                <TableCell>{formatDate(bypass.timestamp, "date")}</TableCell>
                <TableCell>
                  {index === i ? (
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => setIndex(null)}
                    >
                      <CircleX />
                    </Button>
                  ) : (
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => setIndex(i)}
                    >
                      <Info />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }

  function BypassDetail() {
    const bypassItems = dummyBypass[index!].items;

    return (
      <section className="flex-1">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-none">
              <TableHead>Item</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Difference</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bypassItems.map((item, i) => (
              <TableRow key={i} className="border-none">
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.prev}</TableCell>
                <TableCell>{item.curr}</TableCell>
                <TableCell>{item.diff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-5 text-sm">
          <p>Worker reason</p>
          <p className="opacity-50">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aut.
            Quam a quae ex ratione facere, optio aspernatur quas? Quia?
          </p>
        </div>
      </section>
    );
  }
}

function StatusBubble(status: string) {
  const color = {
    Pending: {
      text: "text-foreground/60",
      bg: "bg-foreground/10",
    },
    Approved: {
      text: "text-emerald-600",
      bg: "bg-emerald-600/10",
    },
    Rejected: {
      text: "text-red-600",
      bg: "bg-red-600/10",
    },
  };

  const statusColor = color[status as keyof typeof color];

  return (
    <div
      className={`px-2.5 py-1.5 text-xs ${statusColor.bg} ${statusColor.text} w-fit rounded-xl`}
    >
      {status}
    </div>
  );
}
