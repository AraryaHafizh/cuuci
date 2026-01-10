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
  setStation,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setStation: Dispatch<SetStateAction<string>>;
}) {
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input
        placeholder="Search by order id"
        onChange={(e) => setSearch(e.target.value)}
      />
      <SortDropdown title={"status"} setValue={setStatus} />
      <SortDropdown title={"station"} setValue={setStation} />
    </section>
  );
}

function SortDropdown({
  title,
  setValue,
}: {
  title: "status" | "station";
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const WorkerStatus = {
    IN_PROCESS: "In Process",
    COMPLETED: "Completed",
    ALL: "All",
  };

  const WorkerStation = {
    WASHING: "Washing",
    IRONING: "Ironing",
    PACKING: "Packing",
    ALL: "All",
  };

  const options = title === "station" ? WorkerStation : WorkerStatus;

  const handleChange = (value: string) => {
    setValue(value === "ALL" ? "" : value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Filter by ${title}`} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {title === "station" ? "Station" : "Status"}
          </SelectLabel>

          {Object.entries(options).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
