import SectionInfo from "@/components/SectionInfo";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { dummyData, statusFormatter } from "./data";
import { LaundryItems } from "./LaundryItems";
import { TodayActivities } from "./TodayActivity";

export default function Dashboard() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <Summary />
      <section className="mt-5 gap-5 space-y-5 lg:flex lg:space-y-0">
        <OutletPerformance />
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

function Summary() {
  return (
    <section className="scroll-hidden mt-10 flex gap-5 overflow-x-auto">
      {Object.entries(dummyData.summary).map(([key, val]) => {
        const growth = val.growth;
        const growthColor =
          growth > 0
            ? "text-green-700"
            : growth < 0
              ? "text-red-600"
              : "text-foreground/50";

        const formattedValue =
          key === "totalRevenue"
            ? `Rp. ${formatNumber(val.data)}`
            : formatNumber(val.data);

        const icon =
          growth > 0 ? <TrendingUp /> : growth < 0 ? <TrendingDown /> : null;

        return (
          <div
            key={key}
            className="min-w-fit justify-between space-y-2 rounded-2xl border bg-(--container-bg) p-5 2xl:flex 2xl:flex-1 2xl:flex-col"
          >
            <div>
              <SectionTitle title={val.label} className="mb-1" />

              <p className="text-2xl font-bold">{formattedValue}</p>
            </div>

            <p className={`text-sm ${growthColor} flex items-center gap-2`}>
              {icon}
              {growth}% from last {val.period}
            </p>
          </div>
        );
      })}
    </section>
  );
}

function OrderOverview() {
  return (
    <section className="flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Order Status Overview" />

      <div className="mt-5 text-sm xl:text-base">
        {dummyData.orderStatusOverview.map((item, i) => (
          <div key={i}>
            {item.label === "TOTAL" && <Separator className="my-5" />}
            <div className="flex gap-20 space-y-1">
              <p className="flex-1">
                {statusFormatter[item.label as keyof typeof statusFormatter]}
              </p>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OutletPerformance() {
  const outletTableLabel = [
    "Outlet Name",
    "Total Orders",
    "Active Drivers",
    "Active Workers",
  ];

  return (
    <section className="flex-3 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Outlet Performance" />

      <div className="scroll-hidden mt-5 overflow-x-auto text-sm xl:text-base">
        <div className="w-[180vw] md:w-fit">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-8 border-b pb-2">
            {outletTableLabel.map((label, i) => (
              <p key={i} className="font-medium">
                {label}
              </p>
            ))}
          </div>

          {/* BODY */}
          {dummyData.outletPerformance.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-8 py-2"
            >
              <p>{item.outletName}</p>
              <p>{item.totalOrders}</p>
              <p>{item.activeDrivers}</p>
              <p>{item.activeWorkers}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
