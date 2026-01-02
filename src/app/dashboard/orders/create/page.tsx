"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";
import { useAddress } from "@/hooks/address/useAddress";
import { useOutlets } from "@/hooks/outlet/useOutlet";
import axios from "axios";
import { addMonths, isAfter, isBefore, startOfDay } from "date-fns";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Create() {
  const router = useRouter();

  const [pickup, setPickup] = useState({
    addressId: "",
    pickupAt: "",
    outletId: "",
    note: "",
  });

  const submit = async () => {
  const session = await getSession();

  if (!pickup.addressId || !pickup.pickupAt || !pickup.outletId) {
    alert("Complete required fields");
    return;
  }

};

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:flex 2xl:gap-5 2xl:space-y-0">
        <SelectAddress
          value={pickup.addressId}
          onChange={(id) => setPickup((p) => ({ ...p, addressId: id }))}
        />

        <SelectDateTime
          onChange={(dateTime) =>
            setPickup((p) => ({ ...p, pickupAt: dateTime }))
          }
        />

        <SelectOutlet
          value={pickup.outletId}
          onChange={(id) => setPickup((p) => ({ ...p, outletId: id }))}
        />

        <UserNote
          value={pickup.note}
          onChange={(note) => setPickup((p) => ({ ...p, note }))}
        />
      </section>
      <section className="mt-10 flex justify-end gap-5">
        <Button variant={"outline"} onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={submit}>Schedule Pickup</Button>
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

type SelectAddressProps = {
  value: string;
  onChange: (id: string) => void;
};

function SelectAddress({ value, onChange }: SelectAddressProps) {
  const { data: addresses, isLoading, error } = useAddress();
  if (isLoading) return <p>Loading...</p>;
  if (error || !addresses) return <p>Error</p>;
  console.log({ addresses, isLoading, error });
  return (
    <div>
      {addresses.map((addr) => (
        <button
          key={addr.id}
          onClick={() => onChange(addr.id)}
          className={value === addr.id ? "active" : ""}
        >
          {addr.address}
        </button>
      ))}
    </div>
  );
}

type SelectDateTimeProps = {
  onChange: (isoDate: string) => void;
};

function SelectDateTime({ onChange }: SelectDateTimeProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("06:30");
  const today = startOfDay(new Date()); // normalisasi ke awal hari
  const maxDate = addMonths(today, 3);

  useEffect(() => {
    if (!date) return;

    const [h, m] = time.split(":");
    const combined = new Date(date);
    combined.setHours(Number(h), Number(m));

    onChange(combined.toISOString());
  }, [date, time]);

  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="When to Arrive?" />

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
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

type SelectOutletProps = {
  value: string;
  onChange: (id: string) => void;
};

function SelectOutlet({ value, onChange }: SelectOutletProps) {
  const { data: outlets, isLoading, error} = useOutlets()
  if (isLoading) return <p>Loading...</p>;
  if (error || !outlets) return <p>Failed to load outlets</p>;
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select outlet</option>
      {outlets.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  );
}

type UserNoteProps = {
  value: string;
  onChange: (note: string) => void;
};

function UserNote({ value, onChange }: UserNoteProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Optional note"
    />
  );
}
