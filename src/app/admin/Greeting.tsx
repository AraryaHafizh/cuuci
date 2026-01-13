"use client";

import SectionInfo from "@/components/SectionInfo";
import { useSelf } from "@/hooks/user/useSelf";

export function Greeting() {
  const { data, isPending } = useSelf();
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Welcome Back, Admin!"
        description="Monitor your outlet operations, manage orders, and handle incoming pickup requests with ease"
        role={data?.name ? data.name : ""}
        loading={isPending}
      />
    </section>
  );
}
