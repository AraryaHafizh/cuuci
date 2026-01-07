"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export function CustomerButton({ data }: { data: any }) {
  return (
    <Button
      className="ml-auto rounded-full"
      variant={"ghost"}
      size={"icon-lg"}
      onClick={() => {
        const phone = data.customer.phoneNumber.replace(/\D/g, "");
        const url = `https://api.whatsapp.com/send?phone=${phone}`;
        window.open(url, "_blank");
      }}
    >
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
