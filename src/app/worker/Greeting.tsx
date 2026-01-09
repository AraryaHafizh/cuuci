"use client";

import SectionInfo from "@/components/SectionInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Greeting() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <section className="flex space-y-10">
      <SectionInfo
        title={`Hello, ${session?.user.name}!`}
        description="View your active shift, manage orders, and stay updated with new tasks and requests."
        loading={status === "loading"}
      />
    </section>
  );
}
