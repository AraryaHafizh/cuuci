"use client";

import { WorkStation, workStatusStyle } from "@/components/TaskCard";
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

export default function BypassLists() {
  const { data, isPending } = useBypassorder();

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
        const stationData = workStatusStyle[station];

        return (
          <div key={i} className="rounded-2xl border bg-(--container-bg) p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-light opacity-50">
                Order {item.order.orderNumber}
              </p>
              <div
                className={`rounded-2xl px-3 py-1 text-xs 2xl:text-sm ${stationData.bgColor} ${stationData.textColor} `}
              >
                {station}
              </div>
            </div>
            <p className="text-lg font-medium">
              Wokrer {item.worker.worker.name}
            </p>
            <p className="text-sm font-light">
              Requested at: {formatDate(item.updatedAt)}
            </p>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-50">Request reason:</p>
                <p className="text-sm">{item.order.notes[0].body}</p>
              </div>
              <AcceptTask id={item.id}>
                <Button size={"sm"} variant={"secondary"}>
                  Resolve
                </Button>
              </AcceptTask>
            </div>
          </div>
        );
      })}
    </section>
  );
}

const AcceptTask = ({ id, children }: { id: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: resolve, isPending } = useResolveBypass();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Resolve bypass?</AlertDialogTitle>
          <AlertDialogDescription>
            Once resolved, the bypass will be closed and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              await resolve(id);
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
