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
import { filterRole } from "../../data";

export default function ActionSection() {
  const route = useRouter();
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input placeholder="Search by name, id, email, phone" />
      <SortDropdown />
      <Button onClick={() => route.push("users/create")}>Create User</Button>
    </section>
  );
}

function SortDropdown() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {filterRole.map((role, i) => (
            <SelectItem key={i} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
