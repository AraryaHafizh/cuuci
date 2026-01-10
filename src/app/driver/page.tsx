import SectionInfo from "@/components/SectionInfo";
import DeliverySection from "./DeliverySection";
import { Attendance } from "./attendance";
import { Overview } from "./Overview";

const driverStatus = "inactive";

export default function Driver() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0 xl:mt-20">
        <Attendance />
        <Overview />
      </section>
      <DeliverySection />
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
