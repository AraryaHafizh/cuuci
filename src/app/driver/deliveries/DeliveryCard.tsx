"use client";

import { getDistance } from "@/lib/utils";
import { Hash, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

export interface AvailableDeliveryProps {
  orderId: string;
  username: string;
  address: string;
  lat: number;
  long: number;
  status: string;
}

export function DeliveryCard(data: AvailableDeliveryProps) {
  const driverCoor = [-6.211281680388138, 106.82139922392919];
  const userCoor = [data.lat, data.long];
  const router = useRouter();

  return (
    <div className="flex min-h-65 flex-col justify-between rounded-2xl border bg-(--container-bg) p-5">
      <div>
        <p className="text-lg font-bold lg:text-xl">
          {data.status === "pickup"
            ? `Pickup from ${data.username}`
            : `Delivery to ${data.username}`}
        </p>

        <div className="mt-2 space-y-1 text-sm font-light">
          <span className="flex gap-2">
            <Hash color="#578bc2" size={20} />
            <p className="opacity-50">{data.orderId}</p>
          </span>
          <span className="flex gap-2">
            <Route color="#578bc2" size={20} />
            <p className="opacity-50">
              {getDistance(
                driverCoor[0],
                driverCoor[1],
                userCoor[0],
                userCoor[1],
              )}
            </p>
          </span>
        </div>

        <p className="mt-5 line-clamp-2 font-light">{data.address}</p>
      </div>

      <Button onClick={() => router.push(`/driver/deliveries/${data.orderId}`)}>
        See Details
      </Button>
    </div>
  );
}
