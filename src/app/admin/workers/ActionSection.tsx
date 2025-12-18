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

export const filterRole = {
  DRIVER: "Driver",
  WORKER: "Worker",
  ALL: "All",
};

export default function ActionSection({
  setSearch,
  setRole,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<string>>;
}) {
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input
        placeholder="Search workers"
        onChange={(e) => setSearch(e.target.value)}
      />
      <SortDropdown setRole={setRole} />
    </section>
  );
}

function SortDropdown({
  setRole,
}: {
  setRole: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (value: string) => {
    setRole(value === "ALL" ? "" : value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {Object.entries(filterRole).map(([key, value], i) => (
            <SelectItem key={i} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
