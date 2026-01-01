"use client";

import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export function CustomerButton() {
  return (
    <Button className="ml-auto rounded-full" variant={"ghost"} size={"icon-lg"}>
      <Phone className="text-primary fill-current" />
    </Button>
  );
}

export function SummaryButton() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        className="flex-1"
        variant={"outline"}
        onClick={() => router.back()}
      >
        Back to Detail
      </Button>
      <Button className="flex-1">Submit Summary</Button>
    </div>
  );
}
