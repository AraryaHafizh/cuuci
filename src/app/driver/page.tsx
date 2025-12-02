"use client";

import SectionInfo from "@/components/SectionInfo";
import { userStatus } from "../worker/data";
import { Button } from "@/components/ui/button";
import {
  availableDeliveriesData,
  buttonLabel,
  DeliveryStage,
  ongoingDeliveryData,
} from "./data";
import { DeliveryCard } from "@/app/driver/deliveries/DeliveryCard";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const driverStatus = "inactive";

export default function Driver() {
  return (
    <main className="mt-50">
      <Greeting />
      <div className="mt-20 flex gap-10">
        <Attendance />
        <TaskWidget />
      </div>
      <div className="mt-20 flex gap-10">
        <AvailableDeliveries />
        {ongoingDeliveryData && <OngoingDelivery />}
      </div>
    </main>
  );
}

function Greeting() {
  return (
    <section className="flex space-y-10">
      <SectionInfo
        title="Welcome, Driver"
        description="Manage your pickups and deliveries, track active tasks, and stay updated with new requests."
      />
    </section>
  );
}

function Attendance() {
  return (
    <section className="flex-1 space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <div className="flex justify-between">
        <p className="">Current Status</p>

        <span
          className={`flex items-center gap-1 ${userStatus[driverStatus].textColor}`}
        >
          <div
            className={`h-3 w-3 rounded-full ${userStatus[driverStatus].bgColor}`}
          ></div>
          {userStatus[driverStatus].text}
        </span>
      </div>

      <div>
        <p className="text-xl font-medium">My work hour</p>
        <p className="opacity-50">08:00 AM - 07:00 PM</p>
      </div>

      <div className="flex flex-col space-y-2">
        <Button variant="outline"> Start Day</Button>
        <Button variant="destructive">End Day</Button>
      </div>
    </section>
  );
}

function TaskWidget() {
  function Widget({ title, data }: any) {
    return (
      <div className="bg-background flex w-full flex-col items-center justify-center space-y-3 rounded-2xl border p-10">
        <p className="text-5xl font-black">{data}</p>
        <p className="text-sm font-light opacity-50">{title}</p>
      </div>
    );
  }

  return (
    <section className="flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <p>Today Activity</p>
      <div className="mt-5 flex gap-5">
        <Widget title="Available Requests" data="10" />
        <Widget title="Active Job" data="1" />
        <Widget title="Completed Jobs" data="10" />
      </div>
    </section>
  );
}

function AvailableDeliveries() {
  return (
    <section className="flex-3 space-y-5">
      <p>Available Deliveries</p>
      <div className="grid grid-cols-3 gap-5">
        {availableDeliveriesData.map((delivery: any, i) => (
          <DeliveryCard key={i} {...delivery} />
        ))}
      </div>
    </section>
  );
}

function OngoingDelivery() {
  const data = ongoingDeliveryData;
  const route = useRouter();

  return (
    <section className="h-min flex-1 space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Ongoing Delivery</p>
      <p className="text-xl font-bold">
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

      <div className="flex gap-2">
        <Button className="flex-1">
          {buttonLabel[data.currentStatus as DeliveryStage]}
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => route.push(`driver/deliveries/${data.orderId}`)}
        >
          <Info />
        </Button>
      </div>
    </section>
  );
}
