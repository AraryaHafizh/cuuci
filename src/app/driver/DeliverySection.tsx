"use client";

import { DeliveryCard } from "@/app/driver/deliveries/DeliveryCard";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { availableDeliveriesData, ongoingDeliveryData } from "./data";

export default function DeliverySection() {
  return (
    <section className="mt-10 flex-row-reverse gap-5 space-y-5 xl:mt-20 xl:flex">
      {ongoingDeliveryData && <OngoingDelivery />}
      <AvailableDeliveries />
    </section>
  );
}

function AvailableDeliveries() {
  return (
    <section className="flex-3 space-y-5">
      <SectionTitle title="Available Deliveries" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {availableDeliveriesData.map((delivery: any, i) => (
          <DeliveryCard key={i} {...delivery} />
        ))}
      </div>
    </section>
  );
}

function OngoingDelivery() {
  const data = ongoingDeliveryData;
  const router = useRouter();

  return (
    <section className="h-fit flex-1 space-y-5 rounded-2xl border bg-(--container-bg) p-5 md:sticky md:top-38 md:z-10 xl:mt-11">
      <SectionTitle title="Ongoing Activity" />

      <p className="text-lg font-bold lg:text-xl">
        {data.status === "pickup"
          ? `Pickup from ${data.username}`
          : `Delivery to ${data.username}`}
      </p>

      <div className="font-light">
        <p className="mb-1.5 text-sm opacity-50">Pickup from</p>
        <p className="font-bold">{data.username}</p>
        <p>{data.address}</p>
      </div>
      <Separator />
      <div className="font-light">
        <p className="mb-1.5 text-sm opacity-50">Deliver to</p>
        <p className="font-bold">{data.username}</p>
        <p>{data.address}</p>
      </div>

      <Button
        variant={"secondary"}
        onClick={() => router.push(`driver/deliveries/${data.orderId}`)}
        className="w-full"
      >
        See details
      </Button>
    </section>
  );
}
