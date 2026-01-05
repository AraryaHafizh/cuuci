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
import { useCreatePickup } from "@/hooks/order/useCreatePickup";
import { useNearestOutlet } from "@/hooks/outlet/useNearestOutlet";
import { addMonths, isAfter, isBefore, startOfDay } from "date-fns";
import { Check, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserNote } from "../components/userNote";
import { SelectOutlet } from "../components/selectOutlet";
import { SelectDateTime } from "../components/selectDateTime";
import { SelectAddress } from "../components/selectAddress";

interface PickupFormData {
  addressId: string;
  pickupAt: string;
  outletId: string;
  note: string;
}

export default function Create() {
  const router = useRouter();
  const [pickup, setPickup] = useState<PickupFormData>({
    addressId: "",
    pickupAt: "",
    outletId: "",
    note: "",
  });
  const { mutate: createPickup, isPending } = useCreatePickup();
  const handleSubmit = () => {
    // Validation
    if (!pickup.addressId) {
      toast.error("Please select a pickup address");
      return;
    }
    if (!pickup.pickupAt) {
      toast.error("Please select pickup date and time");
      return;
    }
    if (!pickup.outletId) {
      toast.error("Please wait for outlet assignment");
      return;
    }

    // buat submit
    createPickup(pickup, {
      onSuccess: (response) => {
        toast.success("Pickup request created successfully!");
        router.push(`/dashboard/orders/${response.data.id}`);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to create pickup request",
        );
      },
    });
  };

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:flex 2xl:gap-5 2xl:space-y-0">
        <SelectAddress
          value={pickup.addressId}
          onChange={(id) =>
            setPickup((p) => ({ ...p, addressId: id, outletId: "" }))
          }
        />

        <SelectDateTime
          onChange={(dateTime) =>
            setPickup((p) => ({ ...p, pickupAt: dateTime }))
          }
        />

        <SelectOutlet
          addressId={pickup.addressId}
          value={pickup.outletId}
          onChange={(id) => setPickup((p) => ({ ...p, outletId: id }))}
        />

        <UserNote
          value={pickup.note}
          onChange={(note) => setPickup((p) => ({ ...p, note }))}
        />
      </section>
      <section className="mt-10 flex justify-end gap-5">
        <Button
          variant={"outline"}
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Creating..." : "Schedule Pickup"}
        </Button>
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




