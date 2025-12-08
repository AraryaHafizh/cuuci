import { getDistance } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

type AddressProps = {
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
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

export function AddressCard(data: AddressProps) {
  return (
    <div
      className={`bg-foreground/3 rounded-lg border p-5 transition duration-300 ${
        data.isDefault
          ? "bg-primary/20"
          : "hover:bg-foreground/10 active:bg-foreground/10"
      } flex h-40 flex-col justify-between font-light`}
    >
      <div className="flex justify-between">
        <div className="w-[70%]">
          <p>{data.label}</p>
          <p className="line-clamp-2 opacity-50">{data.address}</p>
        </div>
        {!data.isDefault && (
          <p className="hover:text-primary active:text-primary h-fit text-xs font-medium opacity-50 transition-all duration-300 select-none hover:cursor-pointer hover:opacity-100 active:opacity-100">
            Set default
          </p>
        )}
      </div>
      <div className="mt-5 flex justify-end gap-1.5 text-xs">
        <Link
          href={"#"}
          className="opacity-50 transition duration-300 hover:opacity-100 active:opacity-100"
        >
          Edit
        </Link>
        <Link
          href={"#"}
          className="hover:text-destructive active:text-destructive opacity-50 transition duration-300 hover:opacity-100 active:opacity-100"
        >
          Delete
        </Link>
      </div>
    </div>
  );
}

export function PickupAddressCard(data: AddressProps) {
  return (
    <div
      className={`bg-foreground/3 rounded-lg border-2 p-2.5 transition duration-300 2xl:p-5 ${
        data.isDefault
          ? "bg-primary/20 border-primary"
          : "hover:bg-foreground/10 active:bg-foreground/10"
      } flex h-28 flex-col font-light select-none hover:cursor-pointer 2xl:w-[300px]`}
    >
      <p className="mb-1 text-sm font-medium md:text-base">{data.label}</p>
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
