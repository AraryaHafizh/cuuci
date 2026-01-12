"use client";

import { filterStatus } from "@/app/super-admin/orders/data";
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
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
}) {
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input
        placeholder="Search by order id"
        onChange={(e) => setSearch(e.target.value)}
      />
      <SortDropdown setStatus={setStatus} />
    </section>
  );
}

function SortDropdown({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (value: string) => {
    setStatus(value === "ALL" ? "" : value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {Object.entries(filterStatus).map(([key, value], i) => (
            <SelectItem key={i} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
