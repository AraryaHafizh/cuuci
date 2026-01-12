import SectionInfo from "@/components/SectionInfo";
import { LaundryItems } from "./LaundryItems";
import Metrics from "./Metrics";
import OrderOverview from "./OrderOvervew";
import OutletOverview from "./OutletOverview";
import { TodayActivities } from "./TodayActivity";

export default function Dashboard() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <Metrics />
      <section className="mt-5 gap-5 space-y-5 lg:flex lg:h-[500px] lg:space-y-0">
        <OutletOverview />
        <OrderOverview />
        <LaundryItems />
      </section>
      <TodayActivities />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Welcome Back, Super Admin!"
        description="Your centralized view of all outlets and operations."
      />
    </section>
  );
}
