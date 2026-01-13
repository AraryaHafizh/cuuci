import Metrics from "../super-admin/Metrics";
import { TodayActivities } from "../super-admin/TodayActivity";
import { Attendance } from "./attendance";
import BypassOrder from "./BypassOrder";
import { Greeting } from "./Greeting";
import NewOrder from "./NewOrder";
import OrderOverview from "./OrderOverview";
import { WorkerActivities } from "./WorkerActivity";

export default function Admin() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <Metrics />
      <section className="mt-5 gap-5 space-y-5 lg:flex lg:space-y-0">
        <div className="flex flex-1 flex-col space-y-5">
          <Attendance />
          <OrderOverview />
        </div>
        <WorkerActivities />
        <div className="flex flex-1 flex-col space-y-5">
          <BypassOrder />
          <NewOrder />
        </div>
      </section>
      <TodayActivities />
    </main>
  );
}
