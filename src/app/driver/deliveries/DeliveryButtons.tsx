"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export function CustomerButton() {
  return (
    <Button className="ml-auto rounded-full" variant={"ghost"} size={"icon-lg"}>
      <Phone className="text-primary fill-current" />
    </Button>
  );
}

export function EndButton({ orderId }: { orderId: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`summary/${orderId}`)}
      className="w-full py-6"
    >
      Accept Delivery
    </Button>
  );
}

export function SummaryButton() {
  const router = useRouter();

  return (
    <div className="flex gap-5">
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
