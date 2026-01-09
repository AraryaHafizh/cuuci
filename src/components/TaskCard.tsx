"use client";

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
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ReactNode, useState } from "react";
import { useAcceptTask } from "@/hooks/worker/useAcceptTask";
import { LoadingAnimation } from "./ui/loading-animation";
import { formatDate } from "@/lib/utils";

export type WorkStation = "WASHING" | "IRONING" | "PACKING";
export type WorkStatus =
  | "PENDING"
  | "IN_PROCESS"
  | "BYPASS_REQUESTED"
  | "COMPLETED"
  | "FAILED";

export interface LaundryItem {
  name: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  laundryItemId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  laundryItem: LaundryItem;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "ADMIN" | "WORKER" | string;
  phoneNumber: string;
  emailVerified: boolean;
  verifiedAt: string | null;
  profilePictureUrl: string | null;
  provider: "GOOGLE" | "CREDENTIALS" | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  outletId: string | null;
  isOutletAdmin: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  outletId: string;
  driverId: string;
  addressId: string;
  orderNumber: string;
  status: WorkStatus;
  totalPrice: number;
  totalWeight: number;
  distance: number;
  createdAt: string;
  updatedAt: string;
  pickupTime: string | null;
  deliveryTime: string | null;
  invoiceUrl: string | null;
  customer: Customer;
  orderItems: OrderItem[];
}

export interface OrderWorkProcess {
  id: string;
  workerId: string | null;
  orderId: string;
  station: WorkStation;
  status: WorkStatus;
  notes: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  outletId: string;
  order: Order;
}

export const workStatusStyle: Record<
  WorkStation,
  { bgColor: string; textColor: string }
> = {
  WASHING: {
    bgColor: "bg-blue-200",
    textColor: "text-blue-700",
  },
  IRONING: {
    bgColor: "bg-foreground/20",
    textColor: "text-foreground",
  },
  PACKING: {
    bgColor: "bg-emerald-200",
    textColor: "text-emerald-700",
  },
};

export default function TaskCard(data: any) {
  const router = useRouter();
  const station: WorkStation = data.station;
  const stationData = workStatusStyle[station];

  return (
    <div
      className={`flex min-h-65 flex-col justify-between space-y-2 rounded-2xl border bg-(--container-bg) p-5 lg:min-h-70 2xl:min-h-85 ${data.status === "IN_PROCESS" && "ring-primary/50 shadow-xl ring-5 shadow-black/20"} `}
    >
      <div>
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="font-bold xl:text-xl">
              Order <br /> {data.order.orderNumber}
            </p>
            <p className="text-sm font-light opacity-50">
              Posted {formatDate(data.createdAt)}
            </p>
          </div>
          <div
            className={`rounded-2xl px-3 py-1 text-xs 2xl:text-sm ${stationData.bgColor} ${stationData.textColor} `}
          >
            {station}
          </div>
        </div>

        <Separator className="my-2 2xl:my-5" />

        <p className="text-sm 2xl:text-base">Order items:</p>
        <div className="scroll-hidden mt-2 grid h-23 auto-rows-min grid-cols-2 overflow-y-auto">
          {data.order.orderItems.map((item: any, i: number) => (
            <div
              key={i}
              className="text-sm font-light opacity-50 2xl:text-base"
            >
              • {item.laundryItem.name}
            </div>
          ))}
        </div>

        <Separator className="my-2 2xl:my-5" />

        <div>
          <p className="text-sm 2xl:text-base">Order note:</p>
          <p className="text-sm font-light opacity-50 2xl:text-base">
            {data.notes || "-"}
          </p>
        </div>
      </div>
      {data.status === "PENDING" && (
        <AcceptTask id={data.id}>
          <Button>Start {station.toLowerCase()}</Button>
        </AcceptTask>
      )}
      {data.status === "IN_PROCESS" && (
        <Button onClick={() => router.push(`worker/tasks/${data.id}/review`)}>
          Finish {station.toLowerCase()}
        </Button>
      )}
    </div>
  );
}

const AcceptTask = ({ id, children }: { id: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: acceptTask, isPending } = useAcceptTask();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Accept this task?</AlertDialogTitle>
          <AlertDialogDescription>
            Once confirmed, this task will be assigned to you and the laundry
            process will begin. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              await acceptTask(id);
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Accept"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
