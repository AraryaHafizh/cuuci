"use client";

import {
  AvailableDeliveryProps,
  DeliveryCard,
} from "@/app/driver/deliveries/DeliveryCard";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { useAvailablePickup } from "@/hooks/order/useAvailablePickup";
import { useOngoing } from "@/hooks/order/useOngoing";
import { getLocation } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeliverySection() {
  const { data: available, isPending } = useAvailablePickup();
  const { data: ongoing } = useOngoing();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    getLocation()
      .then(setLocation)
      .catch((err) => {
        console.error("Failed to get location", err);
      });
  }, []);

  return (
    <section className="mt-10 flex-row-reverse gap-5 space-y-5 xl:mt-20 xl:flex">
      {ongoing && <OngoingDelivery data={ongoing} />}
      <AvailableDeliveries
        data={available}
        isPending={isPending}
        userLocation={location}
      />
    </section>
  );
}

function AvailableDeliveries({
  data = [],
  isPending,
  userLocation,
}: {
  data: AvailableDeliveryProps[];
  isPending: boolean;
  userLocation: { lat: number; lng: number } | null;
}) {
  const hasData = data.length > 0;

  return (
    <section className="flex-3 space-y-5">
      <SectionTitle title="Available Deliveries" />

      {isPending && (
        <div className="h-[560px]">
          <LoadingScreen isDashboard />
        </div>
      )}

      {!isPending && !hasData && (
        <div className="flex h-[560px] items-center justify-center rounded-2xl border-3 border-dashed">
          <p className="opacity-50">No deliveries available</p>
        </div>
      )}

      {!isPending && hasData && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((delivery) => (
            <DeliveryCard
              key={delivery.id} // 👈 important
              data={delivery}
              userLat={userLocation?.lat}
              userLng={userLocation?.lng}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function OngoingDelivery({ data }: { data: AvailableDeliveryProps }) {
  const router = useRouter();

  function getTitle() {
    switch (data.status) {
      case "WAITING_FOR_PICKUP":
        return `Pickup from ${data.customer.name}`;
      case "LAUNDRY_ON_THE_WAY":
        return "Delivering to outlet";
      case "DELIVERING_TO_CUSTOMER":
        return `Delivery to ${data.customer.name}`;
      default:
        return "Order in progress";
    }
  }

  return (
    <section className="h-fit flex-1 space-y-5 rounded-2xl border bg-(--container-bg) p-5 md:sticky md:top-38 md:z-10 xl:mt-11">
      <SectionTitle title="Ongoing Activity" />

      <p className="text-lg font-bold lg:text-xl">{getTitle()}</p>

      <div className="font-light">
        <p className="mb-1.5 text-sm opacity-50">Pickup from</p>
        <p className="font-bold">{data.customer.name}</p>
        <p>{data.address.address}</p>
      </div>
      <Separator />
      <div className="font-light">
        <p className="mb-1.5 text-sm opacity-50">Deliver to</p>
        <p className="font-bold">{data.outlet.name}</p>
        <p>{data.outlet.address}</p>
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
