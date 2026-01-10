"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export function ActionSection({
  setSearch,
  setStatus,
  setType,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
}) {
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input
        placeholder="Search by order id"
        onChange={(e) => setSearch(e.target.value)}
      />
      <SortDropdown title={"status"} setStatus={setStatus} />
      <SortDropdown title={"type"} setStatus={setType} />
    </section>
  );
}

function SortDropdown({
  title,
  setStatus,
}: {
  title: "status" | "type";
  setStatus: Dispatch<SetStateAction<string>>;
}) {
  const deliveryStatus = {
    WAITING_FOR_PICKUP: "Waiting for Pickup",
    LAUNDRY_ON_THE_WAY: "Laundry On The Way",
    ARRIVED_AT_OUTLET: "Arrived at Outlet",
    DELIVERY_ON_THE_WAY: "Delivery On The Way",
    COMPLETED: "Completed",
    ALL: "All",
  };

  const deliveryType = {
    DELIVERY: "Delivery",
    PICKUP: "Pickup",
    ALL: "All",
  };

  const options = title === "status" ? deliveryStatus : deliveryType;

  const handleChange = (value: string) => {
    setStatus(value === "ALL" ? "" : value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Filter by ${title}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title === "status" ? "status" : "type"}</SelectLabel>
          {Object.entries(options).map(([key, value], i) => (
            <SelectItem key={i} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
