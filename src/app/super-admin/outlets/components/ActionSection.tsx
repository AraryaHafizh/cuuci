"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ActionSection() {
  const route = useRouter();
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input placeholder="Search by order id" />
      <Button onClick={() => route.push("outlets/create")}>
        Create Outlet
      </Button>
    </section>
  );
}
