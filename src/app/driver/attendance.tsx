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
import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useCheckIn } from "@/hooks/attendance/useCheckIn";
import { useCheckOut } from "@/hooks/attendance/useCheckOut";
import { useStatus } from "@/hooks/attendance/useStatus";
import { useState } from "react";

export function Attendance() {
  const { data, isPending } = useStatus();
  const isWorking = !isPending && data ? data.isWorking : undefined;
  const shift = !isPending && data ? data.shift : undefined;

  return (
    <section className="flex flex-col space-y-5 rounded-2xl border bg-(--container-bg) p-5 lg:flex-1">
      <div className="flex justify-between">
        <SectionTitle title="Current Status" />

        {isPending ? (
          <div className="bg-foreground/10 h-6 w-32 animate-pulse rounded-lg" />
        ) : (
          <span
            className={`flex items-center gap-1 ${
              isWorking ? "text-green-700" : "text-gray-400"
            }`}
          >
            <div
              className={`h-3 w-3 rounded-full ${
                isWorking ? "bg-green-700" : "bg-gray-400"
              }`}
            />
            {isWorking ? "Active" : "Inactive"}
          </span>
        )}
      </div>

      <div>
        <p className="text-xl font-medium">My work hour</p>
        <p className="opacity-50">08:00 – 19:00</p>
      </div>

      <div className="flex flex-col gap-2">
        <CheckIn>
          <Button disabled={isPending || isWorking === true}>Start Day</Button>
        </CheckIn>

        <CheckOut>
          <Button
            variant="outlineDestructive"
            disabled={isPending || isWorking !== true}
          >
            End Day
          </Button>
        </CheckOut>
      </div>
    </section>
  );
}

const CheckIn = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: checkIn, isPending } = useCheckIn();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Check-In</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to check in and start your work shift. This action
            will record your working time.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              await checkIn();
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Check In"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const CheckOut = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: checkOut, isPending } = useCheckOut();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Check-Out</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to check out and end your work shift. Make sure all
            tasks are completed before continuing.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            variant="destructive"
            disabled={isPending}
            onClick={async () => {
              await checkOut();
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Check Out"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
