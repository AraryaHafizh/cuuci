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
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useAddress } from "@/hooks/address/useAddress";
import { useCreate } from "@/hooks/order/useCreate";
import { useNearest } from "@/hooks/outlet/useNearest";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { SelectAddress } from "../components/selectAddress";
import { SelectDateTime } from "../components/selectDateTime";
import { SelectOutlet } from "../components/selectOutlet";
import { UserNote } from "../components/userNote";
import { AddressProps } from "./PickupAddressCard";
import { toast } from "sonner";

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

    const now = new Date();

    const isToday = pickupDate.toDateString() === now.toDateString();

    if (isToday && pickupDate < now) {
      toast.error("Pickup time cannot be earlier than the current time");
      return;
    }

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
