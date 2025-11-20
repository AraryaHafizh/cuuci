"use client";

import { OutletAddressCard, PickupAddressCard } from "@/components/AddressCard";
import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addMonths, isAfter, isBefore, startOfDay } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { userAddress } from "../../account/data";
import { outletLocation } from "./data";

export default function Create() {
  const route = useRouter();
  return (
    <main className="mt-50">
      <Greeting />
      <section className="mt-20 flex gap-10">
        <SelectAddress />
        <SelectDateTime />
        <SelectOutlet />
        <UserNote />
      </section>
      <section className="mt-10 flex justify-end">
        <Button onClick={() => route.push("/dashboard/orders/summary")}>
          Schedule Pickup
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

function SelectAddress() {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Where to Pick Up?</p>
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <PickupAddressCard key={i} {...userAddress[i]} />
        ))}
      </div>
    </section>
  );
}

function SelectDateTime() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const today = startOfDay(new Date()); // normalisasi ke awal hari
  const maxDate = addMonths(today, 3);

  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>When to Arrive?</p>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
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
        defaultValue="06:30"
        className="appearance-none bg-(--container-bg) dark:bg-(--container-bg) [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </section>
  );
}

function SelectOutlet() {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Select Outlet Location</p>
      {outletLocation.map((outlet, i) => (
        <OutletAddressCard
          key={i}
          {...outlet}
          userLatitude={userAddress[0].latitude}
          userLongitude={userAddress[0].longitude}
        />
      ))}
    </section>
  );
}

function UserNote() {
  return (
    <div className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>User Note</p>
      <Textarea
        placeholder="e.g., Please use the side door.
Watch out for the dog."
        className="h-[90%]"
      />
    </div>
  );
}
