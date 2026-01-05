import { getDistance } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { useDefault } from "@/hooks/address/useDefault";

type AddressProps = {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
};

type OutletAddressProps = {
  label: string;
  address: string;
  userLatitude: number;
  userLongitude: number;
  latitude: number;
  longitude: number;
  isDefault: boolean;
};



export function PickupAddressCard(data: AddressProps) {
  return (
    <div
      className={`bg-foreground/3 rounded-lg border-2 p-2.5 transition duration-300 2xl:p-5 ${
        data.isPrimary
          ? "bg-primary/20 border-primary"
          : "hover:bg-foreground/10 active:bg-foreground/10"
      } flex h-28 flex-col font-light select-none hover:cursor-pointer 2xl:w-[300px]`}
    >
      <p className="line-clamp-2 text-sm opacity-50">{data.address}</p>
    </div>
  );
}

export function OutletAddressCard(data: OutletAddressProps) {
  return (
    <div
      className={`bg-foreground/3 rounded-lg border-2 p-2.5 transition duration-300 2xl:p-5 ${
        data.isDefault
          ? "bg-primary/20 border-primary"
          : "hover:bg-foreground/10 active:bg-foreground/10"
      } flex h-28 flex-col font-light select-none hover:cursor-pointer 2xl:w-[380px]`}
    >
      <div className="flex justify-between">
        <div className="flex-2">
          <p className="mb-1 text-sm font-medium md:text-base">{data.label}</p>
          <p className="line-clamp-2 text-sm opacity-50">{data.address}</p>
        </div>
        <p className="flex-1 text-right text-xs">
          {getDistance(
            data.userLatitude,
            data.userLongitude,
            data.latitude,
            data.longitude,
          )}
        </p>
      </div>
    </div>
  );
}
