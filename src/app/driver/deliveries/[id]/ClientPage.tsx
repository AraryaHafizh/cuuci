"use client";

import { InfoCard } from "@/components/InfoCard";
import Map from "@/components/Map";
import SectionInfo from "@/components/SectionInfo";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  LoadingAnimation,
  LoadingScreen,
} from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useAcceptPickup } from "@/hooks/order/useAcceptPickup";
import { usePickupDetail } from "@/hooks/order/usePickupDetail";
import { getDistance, getLocation } from "@/lib/utils";
import { House, Navigation, Store } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { CustomerButton } from "../DeliveryButtons";
import Status from "./Status";

export default function ClientPage({ id }: { id: string }) {
  const { data, isPending } = usePickupDetail(id);
  const { mutateAsync: acceptPickup, isPending: isPending2 } =
    useAcceptPickup();
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

  async function onSubmit() {
    acceptPickup(id);
  }

  if (isPending) return <LoadingScreen />;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting data={data} isPending={isPending} />
      <section className="mt-10 flex-row-reverse gap-5 space-y-5 xl:mt-20 xl:flex">
        <Map
          lat1={location?.lat || -6.211281680388138}
          lng1={location?.lng || 106.82139922392919}
          lat2={Number(data.address.latitude)}
          lng2={Number(data.address.longitude)}
        />
        <div className="flex-1/2 space-y-5">
          <CustomerDetail
            data={data}
            driverLat={location?.lat || -6.211281680388138}
            driverLng={location?.lng || 106.82139922392919}
          />
          <Status />
          <DeliverySummary
            data={data}
            lat={Number(data.address.latitude)}
            lng={Number(data.address.longitude)}
          />
          {data.status === "WAITING_FOR_PICKUP" ? (
            <AcceptRequest onSubmit={onSubmit} isPending={isPending2}>
              <Button className="w-full">Accept Pickup</Button>
            </AcceptRequest>
          ) : (
            <PickupRequest onSubmit={onSubmit} isPending={isPending2}>
              <Button className="w-full">Confirm Pickup</Button>
            </PickupRequest>
          )}
        </div>
      </section>
    </main>
  );
}

function Greeting({ data, isPending }: { data: any; isPending: boolean }) {
  return (
    <section className="space-y-10">
      <SectionInfo
        title={
          data.status === "WAITING_FOR_PICKUP"
            ? `Pickup Detail`
            : `Delivery Detail`
        }
        description="View all details of this order, including pickup and delivery information."
        loading={isPending}
      />
    </section>
  );
}

function CustomerDetail({
  data,
  driverLat,
  driverLng,
}: {
  data: any;
  driverLat: number;
  driverLng: number;
}) {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Customer Details" />

      <div className="flex items-center gap-4">
        <div className="bg-foreground/10 flex h-15 w-15 items-center justify-center rounded-full lg:h-20 lg:w-20 lg:text-2xl">
          {data.customer.name[0].toUpperCase()}
        </div>

        <div className="flex flex-col justify-center">
          <span className="font-medium">{data.customer.name}</span>
          <span className="opacity-50">
            Distance{" "}
            {getDistance(
              driverLat,
              driverLng,
              Number(data.address.latitude),
              Number(data.address.longitude),
            )}
          </span>
        </div>
        <CustomerButton />
      </div>
    </section>
  );
}

function DeliverySummary({
  data,
  lat,
  lng,
}: {
  data: any;
  lat: number;
  lng: number;
}) {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Delivery Details" />

      <InfoCard
        icon={<House />}
        label="Delivery Address"
        title={data.customer.name + " address"}
        value={data.address.address}
        endButtonIcon={<Navigation className="text-primary fill-current" />}
        endButtonUrl={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=two-wheeler`}
      />
      <InfoCard
        icon={<Store />}
        label="Outlet Address"
        title={data.outlet.name}
        value={data.outlet.address}
      />
    </section>
  );
}

const AcceptRequest = ({
  onSubmit,
  isPending,
  children,
}: {
  onSubmit: () => Promise<void>;
  isPending: boolean;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Accept this pickup?</AlertDialogTitle>
          <AlertDialogDescription>
            Once accepted, this pickup will be assigned to you and other drivers
            will no longer be able to take it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              await onSubmit();
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Accept"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const PickupRequest = ({
  onSubmit,
  isPending,
  children,
}: {
  onSubmit: (file: File) => Promise<void>;
  isPending: boolean;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      if (preview) URL.revokeObjectURL(preview);
      setImage(null);
      setPreview(null);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="z-9999">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm package pickup?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm that you have picked up the package. A photo is required as
            proof.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isPending}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            setImage(file);
            setPreview(url);
          }}
        />

        <div
          onClick={() => inputRef.current?.click()}
          className="hover:bg-foreground/10 active:bg-foreground/10 flex h-52 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed text-sm transition-all duration-300 select-none"
        >
          {!preview ? (
            <p className="opacity-50">Upload pickup proof</p>
          ) : (
            <img
              src={preview}
              alt="Pickup proof"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending || !image}
            onClick={async () => {
              if (!image) return;
              await onSubmit(image);
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Confirm Pickup"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// NOTE: add UI when package is secure and otw to outlet
