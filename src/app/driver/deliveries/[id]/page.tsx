import { InfoCard } from "@/components/InfoCard";
import Map from "@/components/Map";
import SectionInfo from "@/components/SectionInfo";
import { getDistance } from "@/lib/utils";
import { House, Navigation, TextAlignStart } from "lucide-react";
import { CustomerButton, EndButton } from "../DeliveryButtons";
import Status from "./Status";
import { SectionTitle } from "@/components/ui/section-title";

interface DeliveryDetailProps {
  params: Promise<{ id: string }>;
}

async function DeliveryDetail(props: DeliveryDetailProps) {
  const { id } = await props.params;
  const driverCoor = [-6.211281680388138, 106.82139922392919];
  const userCoor = [-6.2653, 106.7819];

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 flex-row-reverse gap-5 space-y-5 xl:mt-20 xl:flex">
        <Map
          lat1={driverCoor[0]}
          lng1={driverCoor[1]}
          lat2={userCoor[0]}
          lng2={userCoor[1]}
        />
        <div className="flex-1/2 space-y-5">
          <CustomerDetail />
          <Status />
          <DeliverySummary />
          <EndButton orderId={id} />
        </div>
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
      <SectionTitle title="Customer Details" />

      <div className="flex items-center gap-4">
        <div className="bg-foreground/10 flex h-15 w-15 items-center justify-center rounded-full lg:h-20 lg:w-20 lg:text-2xl">
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
      <SectionTitle title="Delivery Details" />

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
