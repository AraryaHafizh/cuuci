"use client";

import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { filterStatus } from "../data";

export default function ActionSection() {
  const router = useRouter();
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input placeholder="Search by name, id, email, phone" />
      <SortDropdown />
    </section>
  );
}

function SortDropdown() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {Object.entries(filterStatus).map(([key, value], i) => (
            <SelectItem key={i} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
