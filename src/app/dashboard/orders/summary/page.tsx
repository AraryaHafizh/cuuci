import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import {
  Clock,
  House,
  Phone,
  TextAlignStart,
  WashingMachine,
} from "lucide-react";
import { InfoCard } from "../../../../components/InfoCard";
import Map from "../../../../components/Map";

export default function Summary() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-5">
          <DriverDetail />
          <OrderSummary />
        </div>
        <Map lat1={-6.2} lng1={106.8166} lat2={-6.2653} lng2={106.7819} />
      </section>
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Your Pickup is Confirmed!"
        description="See your laundry order and delivery progress."
      />
    </section>
  );
}

function DriverDetail() {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p className="font-medium">Driver Details</p>
      <div className="flex items-center gap-4">
        <div className="bg-foreground/10 flex h-20 w-20 items-center justify-center rounded-full text-2xl">
          JD
        </div>

        <div className="flex flex-col justify-center">
          <span className="font-medium">John Doe</span>
          <span className="text-sm opacity-50">ETA: 15 minutes</span>
        </div>

        <Button
          className="bg-primary/30 ml-auto rounded-full"
          variant={"ghost"}
          size={"icon-lg"}
        >
          <Phone className="text-primary fill-current" />
        </Button>
      </div>
    </section>
  );
}

function OrderSummary() {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p className="font-medium">Order Details</p>
      <InfoCard
        icon={<House />}
        label="Pickup Location"
        title="Home"
        value="123 Main Street, Anytown, USA 12345"
      />
      <InfoCard
        icon={<WashingMachine />}
        label="Pickup Time"
        value="June 28, 2026, 2:00 PM"
      />
      <InfoCard
        icon={<Clock />}
        label="User Note"
        value="Please use the side door. Watch out for the dog."
      />
      <InfoCard
        icon={<TextAlignStart />}
        label="User Note"
        value="Please use the side door. Watch out for the dog."
      />
    </section>
  );
}
