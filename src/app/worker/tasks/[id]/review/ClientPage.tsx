"use client";

import SectionInfo from "@/components/SectionInfo";
import { OrderItem, OrderWorkProcess } from "@/components/TaskCard";
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
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { Counter } from "@/components/ui/shadcn-io/counter";
import { Textarea } from "@/components/ui/textarea";
import { AssignOrderItem } from "@/hooks/order/useAssignTask";
import { useBypass } from "@/hooks/worker/useBypass";
import { useFinish } from "@/hooks/worker/useFinish";
import { useTaskDetail } from "@/hooks/worker/useTaskDetail";
import { CircleAlert } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ClientPage({ id }: { id: string }) {
  const { data, isPending } = useTaskDetail(id);

  const [note, setNote] = useState("");
  const [items, setItems] = useState<{ id: string; qty: number }[]>([]);

  useEffect(() => {
    if (data?.order?.orderItems) {
      setItems(
        data.order.orderItems.map((item: OrderItem) => ({
          id: item.laundryItemId,
          qty: 0,
        })),
      );
    }
  }, [data]);

  const updateQty = (i: number, qty: number) =>
    setItems((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, qty: Math.max(qty, 0) } : v)),
    );

  if (isPending) return <LoadingScreen />;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting station={data.station} />
      <Caution />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0">
        <Items data={data} items={items} updateQty={updateQty} />
        <div className="flex-1 space-y-5">
          <Action data={data} note={note} setNote={setNote} />
          <FinishTask id={data.id} body={items}>
            <Button className="w-full py-5">Finish task</Button>
          </FinishTask>
        </div>
      </section>
    </main>
  );
}

function Greeting({ station }: { station: string }) {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Task Review"
        description="Please review the laundry items and report any discrepancies before completing the task."
        role={station}
      />
    </section>
  );
}

function Caution() {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 rounded-2xl border-2 border-amber-400 bg-amber-200/30 p-5 text-amber-400">
        <CircleAlert size={40} className="flex-1" />
        <div className="flex-5 md:flex-13 xl:flex-25">
          <p className="text-xl font-bold 2xl:text-2xl">
            Attention Before Submitting
          </p>
          <p className="text-foreground/60 text-sm font-light 2xl:text-base">
            Verify every item and ensure the total count is accurate. Any
            discrepancy must be reported and submitted for admin bypass.
          </p>
        </div>
      </div>
    </section>
  );
}

function Items({
  data,
  items,
  updateQty,
}: {
  data: OrderWorkProcess;
  items: { id: string; qty: number }[];
  updateQty: (i: number, val: number) => void;
}) {
  return (
    <section className="flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Order Items" className="mb-5" />
      {data.order.orderItems.map((item: OrderItem, i: number) => (
        <div key={i}>
          <div className="flex items-center justify-between">
            <p className="md:text-lg">{item.laundryItem.name}</p>
            <Counter
              number={items[i]?.qty ?? 0}
              setNumber={(num) => (num < 0 ? null : updateQty(i, num))}
            />
          </div>
          {i !== data.order.orderItems.length - 1 && (
            <Separator className="my-3" />
          )}
        </div>
      ))}
    </section>
  );
}

function Action({
  data,
  note,
  setNote,
}: {
  data: OrderWorkProcess;
  note: string;
  setNote: (note: string) => void;
}) {
  return (
    <section className="h-fit rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Request Bypass" />

      <Textarea
        className="my-3 h-[20vh]"
        placeholder="Reason for bypass..."
        onChange={(e) => setNote(e.target.value)}
      ></Textarea>

      <RequestBypass id={data.id} note={note}>
        <Button className="mt-5 w-full" variant={"destructive"}>
          Request Bypass
        </Button>
      </RequestBypass>
    </section>
  );
}

const RequestBypass = ({
  id,
  note,
  children,
}: {
  id: string;
  note: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: bypassTask, isPending } = useBypass();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Submit bypass request?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to request a bypass for this task. Once submitted, you
            will not be able to take other tasks until the admin resolves this
            request.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              if (!note || !note.trim()) {
                toast.error("Please provide a reason for the bypass request");
                return;
              }
              await bypassTask({ jobId: id, note });
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const FinishTask = ({
  id,
  body,
  children,
}: {
  id: string;
  body: AssignOrderItem[];
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: finishTask, isPending } = useFinish();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Finish task?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to finish this task. This action will mark it as
            completed and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              await finishTask({ jobId: id, body: { orderItems: body } });
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
