"use client";

import { getDistance } from "@/lib/utils";
import { Hash, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

export interface Customer {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER";
  phoneNumber: string;
  profilePictureUrl: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  outletId: string;
  driverId: string | null;
  addressId: string;
  orderNumber: string;
  status:
    | "WAITING_FOR_PICKUP"
    | "ON_PICKUP"
    | "ON_DELIVERY"
    | "COMPLETED"
    | string;
  totalPrice: number;
  totalWeight: number;
  distance: number;
  pickupTime: string;
  deliveryTime: string | null;
  invoiceUrl: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  address: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Outlet {
  id: string;
  outletId: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  adminId: string;
}

export interface AvailableDeliveryProps {
   id: string;
  customerId: string;
  outletId: string;
  driverId: string | null;
  addressId: string;
  orderNumber: string;
  status:
    | "WAITING_FOR_PICKUP"
    | "ON_PICKUP"
    | "ON_DELIVERY"
    | "COMPLETED"
    | string;
  totalPrice: number;
  totalWeight: number;
  distance: number;
  pickupTime: string;
  deliveryTime: string | null;
  invoiceUrl: string | null;

  createdAt: string;
  updatedAt: string;

  address: Address;
  customer: Customer;
  outlet: Outlet;
}

export function DeliveryCard({
  data,
  userLat = -6.211281680388138,
  userLng = 106.82139922392919,
}: {
  data: AvailableDeliveryProps;
  userLat?: number;
  userLng?: number;
}) {
  const driverCoor = [userLat, userLng];
  const userCoor = [
    Number(data.address.latitude),
    Number(data.address.longitude),
  ];
  const router = useRouter();

  return (
    <div className="flex min-h-65 flex-col justify-between rounded-2xl border bg-(--container-bg) p-5">
      <div>
        <p className="text-lg font-bold lg:text-xl">
          {data.status === "WAITING_FOR_PICKUP"
            ? `Pickup from ${data.customer.name}`
            : `Delivery to ${data.customer.name}`}
        </p>

        <div className="mt-2 space-y-1 text-sm font-light">
          <span className="flex gap-2">
            <Hash color="#578bc2" size={20} />
            <p className="opacity-50">{data.orderNumber}</p>
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

        <p className="mt-5 line-clamp-2 font-light">{data.address.address}</p>
      </div>

      <Button onClick={() => router.push(`/driver/deliveries/${data.id}`)}>
        See Details
      </Button>
    </div>
  );
}
