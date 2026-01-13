"use client";

import { WorkStation } from "@/components/TaskCard";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  LoadingAnimation,
  LoadingScreen,
} from "@/components/ui/loading-animation";
import { Separator } from "@/components/ui/separator";
import { useBypassorder } from "@/hooks/order/useBypassOrder";
import { useResolveBypass } from "@/hooks/order/useResolveBypass";
import { formatDate } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { statusMap } from "../WorkerActivity";

export default function BypassLists() {
  const { data, isPending } = useBypassorder();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (isPending)
    return (
      <div className="h-[560px]">
        <LoadingScreen isDashboard={true} />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="mt-10 flex h-[60vh] items-center justify-center rounded-2xl border">
        <p className="opacity-50">no new order available</p>
      </div>
    );

  return (
    <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data.map((item: any, i: number) => {
        const station: WorkStation = item.station;
        const stationData = statusMap[station];
        const note = item.order.notes[0];

        const isExpanded = expandedIndex === i;

        return (
          <div
            key={i}
            onClick={() => setExpandedIndex(isExpanded ? null : i)}
            className={`hover:ring-primary/50 cursor-pointer rounded-2xl border bg-(--container-bg) p-5 transition hover:ring-5 ${isExpanded ? "ring-primary/50 ring-5" : ""}`}
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-light opacity-50">
                Order {item.order.orderNumber}
              </p>
              <div
                className={`bg-foreground/10 rounded-2xl px-3 py-1 text-xs 2xl:text-sm ${stationData.text}`}
              >
                {station}
              </div>
            </div>

            <p className="text-lg font-medium">
              Worker {item.worker.worker.name}
            </p>

            <p className="text-sm font-light">
              Requested at: {formatDate(item.updatedAt)}
            </p>

            {isExpanded && note?.items?.length > 0 && (
              <div className="bg-foreground/5 mt-3 space-y-2 rounded-xl p-3 text-sm">
                <div className="flex font-medium opacity-60">
                  <p className="w-1/2">Item</p>
                  <p className="w-1/6 text-center">Req</p>
                  <p className="w-1/6 text-center">Ori</p>
                  <p className="w-1/6 text-center">Diff</p>
                </div>

                {note.items.map((it: any, i: number) => {
                  const diffColor =
                    it.difference > 0 ? "text-red-500" : "text-emerald-500";

                  return (
                    <div key={i} className="flex items-center">
                      <p className="w-1/2">{it.name}</p>
                      <p className="w-1/6 text-center">{it.qty}</p>
                      <p className="w-1/6 text-center">{it.originalQty}</p>
                      <p
                        className={`w-1/6 text-center font-semibold ${diffColor}`}
                      >
                        {it.difference}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-50">Request reason:</p>
                <p className="text-sm">{note.body}</p>
              </div>

              <ResolveBypass id={item.id} items={note.items}>
                <Button size="sm" variant="secondaryDestructive">
                  Resolve
                </Button>
              </ResolveBypass>
            </div>
          </div>
        );
      })}
    </section>
  );
}

const ResolveBypass = ({
  id,
  items,
  children,
}: {
  id: string;
  items: any;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: resolve, isPending } = useResolveBypass();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="z-9999"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Resolve bypass?</AlertDialogTitle>
          <AlertDialogDescription>
            Resolving this will update item quantities permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            variant={"destructive"}
            disabled={isPending}
            onClick={async () => {
              await resolve({ id, items });
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Resolve"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
