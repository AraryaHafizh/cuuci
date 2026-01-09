"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Greeting() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <section className="space-y-5 md:space-y-10">
      <SectionInfo
        title={`Hello, ${session?.user.name}!`}
        description="Here's a summary of your laundry activities."
        loading={status === "loading"}
      />
      <Button onClick={() => router.push("/dashboard/orders/create")}>
        Schedule a New Pickup
      </Button>
    </section>
  );
}
