import { InfoCard } from "@/components/InfoCard";
import Map from "@/app/dashboard/orders/summary/Map";
import SectionInfo from "@/components/SectionInfo";
import { getDistance } from "@/lib/utils";
import { House, Navigation, TextAlignStart } from "lucide-react";
import { CustomerButton, EndButton } from "../DeliveryButtons";
import { DeliveryStage } from "../../data";
import Status from "./Status";

interface DeliveryDetailProps {
  params: Promise<{ id: string }>;
}

async function DeliveryDetail(props: DeliveryDetailProps) {
  const { id } = await props.params;
  const driverCoor = [-6.211281680388138, 106.82139922392919];
  const userCoor = [-6.2653, 106.7819];

  return (
    <main className="mt-50">
      <Greeting />
      <section className="mt-20 grid grid-cols-[1fr_2fr] gap-10">
        <div className="space-y-10">
          <CustomerDetail />
          <Status />
          <DeliverySummary />
          <EndButton orderId={id} />
        </div>
        <Map
          lat1={driverCoor[0]}
          lng1={driverCoor[1]}
          lat2={userCoor[0]}
          lng2={userCoor[1]}
        />
      </section>
    </main>
  );

  function Greeting() {
    return (
      <section className="space-y-10">
        <SectionInfo
          title={`Delivery ${id} Details`}
          description="View all details of this order, including pickup and delivery information."
        />
      </section>
    );
  }
}

function CustomerDetail() {
  const driverCoor = [-6.211281680388138, 106.82139922392919];
  const userCoor = [-6.2653, 106.7819];
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Customer Details</p>
      <div className="flex items-center gap-4">
        <div className="bg-foreground/10 flex h-20 w-20 items-center justify-center rounded-full text-2xl">
          JD
        </div>

        <div className="flex flex-col justify-center">
          <span className="font-medium">John Doe</span>
          <span className="opacity-50">
            Distance{" "}
            {getDistance(
              driverCoor[0],
              driverCoor[1],
              userCoor[0],
              userCoor[1],
            )}
          </span>
        </div>
        <CustomerButton />
      </div>
    </section>
  );
}

function DeliverySummary() {
  const userCoor = [-6.2653, 106.7819];

  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Delivery Details</p>
      <InfoCard
        icon={<House />}
        label="Delivery Address"
        title="Home"
        value="123 Main Street, Anytown, USA 12345"
        endButtonIcon={<Navigation className="text-primary fill-current" />}
        endButtonUrl={`https://www.google.com/maps/dir/?api=1&destination=${userCoor[0]},${userCoor[1]}&travelmode=two-wheeler`}
      />
      <InfoCard
        icon={<House />}
        label="Outlet Address"
        title="Home"
        value="123 Main Street, Anytown, USA 12345"
      />
      <InfoCard
        icon={<TextAlignStart />}
        label="User Note"
        value="Please use the side door. Watch out for the dog."
      />
    </section>
  );
}

export default DeliveryDetail;
