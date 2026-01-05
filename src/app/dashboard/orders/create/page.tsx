"use client";

import SectionInfo from "@/components/SectionInfo";
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
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { Textarea } from "@/components/ui/textarea";
import { useAddress } from "@/hooks/address/useAddress";
import { useNearest } from "@/hooks/outlet/useNearest";
import { addMonths, isAfter, isBefore, startOfDay } from "date-fns";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import OutletCard, { OutletProps } from "./OutletCard";
import { AddressProps, PickupAddressCard } from "./PickupAddressCard";
import { useCreate } from "@/hooks/order/useCreate";

export default function Create() {
  const router = useRouter();

  const [outletId, setOutletId] = useState<string>("");
  const [addressId, setAdressId] = useState<string>("");
  const [lat, setLat] = useState<string>();
  const [lng, setLng] = useState<string>();
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("06:30");

  const { data: addresses, isPending } = useAddress({ index: 2 });
  const { data: nearest, isPending: isPending2 } = useNearest(lat, lng);
  const { mutateAsync: pickup, isPending: isPending3 } = useCreate();

  useEffect(() => {
    if (!addresses || !addressId) return;

    const selected = addresses.find(
      (addr: AddressProps) => addr.id === addressId,
    );

    if (selected) {
      setLat(selected.latitude);
      setLng(selected.longitude);
    }
  }, [addressId, addresses]);

  async function onSubmit() {
    if (!date || !time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const pickupDate = new Date(date);
    pickupDate.setHours(hours, minutes, 0, 0);

    await pickup({
      addressId,
      outletId,
      notes: note || null,
      pickupTime: pickupDate,
    });
  }

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:flex 2xl:gap-5 2xl:space-y-0">
        <SelectAddress
          data={addresses}
          isPending={isPending}
          addressId={addressId}
          setAdressId={setAdressId}
        />
        <SelectDateTime
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
        />
        <SelectOutlet
          data={nearest}
          isPending={isPending2}
          outletId={outletId}
          setOutletId={setOutletId}
        />
        <UserNote setNote={setNote} />
      </section>
      <section className="mt-10 flex justify-end gap-5">
        <Button
          variant={"outline"}
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <PickupConfirmation onSubmit={onSubmit} isPending={isPending3}>
          <Button>Schedule Pickup</Button>
        </PickupConfirmation>
      </section>
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Request Pickup"
        description="Create a new laundry pickup request quickly and easily."
      />
    </section>
  );
}

function SelectAddress({
  data,
  isPending,
  addressId,
  setAdressId,
}: {
  data: any;
  isPending: boolean;
  addressId: string;
  setAdressId: (id: string) => void;
}) {
  return (
    <section className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Where to Pick Up?" />
      {isPending ? (
        <div className="flex h-full min-h-52 items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="space-y-5">
          {data.length === 0 ? (
            <p className="flex h-86 items-center justify-center font-light opacity-50">
              no address available. please create one.
            </p>
          ) : (
            Array.from({ length: data.length }).map((_, i) => (
              <PickupAddressCard
                key={i}
                index={i + 1}
                data={data[i]}
                addressId={addressId}
                setAdressId={setAdressId}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}

function SelectDateTime({
  date,
  setDate,
  time,
  setTime,
}: {
  date: Date | undefined;
  setDate: (date: Date) => void;
  time: string;
  setTime: (time: string) => void;
}) {
  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 3);

  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="When to Arrive?" />

      <Calendar
        mode="single"
        selected={date}
        onSelect={(d) => d && setDate(d)}
        className="w-full rounded-md border shadow-sm"
        captionLayout="dropdown"
        startMonth={today}
        endMonth={maxDate}
        disabled={(currentDate) => {
          const day = startOfDay(currentDate);
          return isBefore(day, today) || isAfter(day, maxDate);
        }}
      />
      <Input
        id="time-picker"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="appearance-none bg-(--container-bg) dark:bg-(--container-bg) [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </section>
  );
}

function SelectOutlet({
  data = [],
  isPending,
  outletId,
  setOutletId,
}: {
  data: OutletProps[];
  isPending: boolean;
  outletId: string;
  setOutletId: (id: string) => void;
}) {
  return (
    <section className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Select Outlet Location" />

      {isPending ? (
        <div className="flex h-full min-h-52 items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : data.length === 0 ? (
        <p className="flex h-86 items-center justify-center font-light opacity-50">
          no outlets available.
        </p>
      ) : (
        data.map((outlet: any, i: number) => (
          <OutletCard
            key={i}
            data={outlet}
            outletId={outletId}
            setOutletId={setOutletId}
          />
        ))
      )}
    </section>
  );
}

function UserNote({ setNote }: { setNote: (note: string) => void }) {
  return (
    <div className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="User Note" />

      <Textarea
        placeholder="e.g., Caution with the dress."
        className="h-40 md:h-[90%]"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNote(e.target.value)
        }
      />
    </div>
  );
}

const PickupConfirmation = ({
  onSubmit,
  isPending,
  children,
}: {
  onSubmit: () => Promise<void>;
  isPending: boolean;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create request pickup?</AlertDialogTitle>
          <AlertDialogDescription>
            Make sure everything is correct before submitting.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              await onSubmit();
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Submit request"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
