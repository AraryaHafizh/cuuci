"use client";

import SectionInfo from "@/components/SectionInfo";
import { useSelfDriver } from "@/hooks/user/useSelf";

export function Greeting() {
  const { data, isPending } = useSelfDriver();
  return (
    <section className="flex space-y-10">
      <SectionInfo
        title={`Welcome, ${data?.driver?.name}`}
        description="Manage your pickups and deliveries, track active tasks, and stay updated with new requests."
        role={`Outlet ${data?.outlet?.name ?? ""}`}
        loading={isPending}
      />
    </section>
  );
}
