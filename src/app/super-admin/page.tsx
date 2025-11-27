"use client";

import SectionInfo from "@/components/SectionInfo";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatNumber } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { dummyData, statusFormatter } from "./data";

export default function Dashboard() {
  return (
    <main className="mt-50">
      <Greeting />
      <Summary />
      <section className="mt-5 flex gap-5">
        <OutletPerformance />
        <OrderOverview />
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
    <section className="mt-10 flex gap-5">
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
            className="flex flex-1 flex-col justify-between space-y-2 rounded-2xl border bg-(--container-bg) p-5"
          >
            <div>
              <p>{val.label}</p>
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
    <section className="h-fit flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <p>Order Status Overview</p>
      <div className="mt-5">
        {dummyData.orderStatusOverview.map((item, i) => (
          <div key={i}>
            {item.label === "TOTAL" && <Separator className="my-2" />}
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
      <p>Outlet Performance</p>

      <div className="mt-10">
        <div className="grid grid-cols-4 gap-12 border-b pb-2">
          {outletTableLabel.map((label, i) => (
            <p key={i}>{label}</p>
          ))}
        </div>

        {dummyData.outletPerformance.map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-12 py-2">
            <p>{item.outletName}</p>
            <p>{item.totalOrders}</p>
            <p>{item.activeDrivers}</p>
            <p>{item.activeWorkers}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TodayActivities() {
  return (
    <section className="mt-5 h-fit flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <p>Today Activities</p>
      <div className="mt-5 grid grid-cols-3 gap-5">
        {dummyData.todayActivity.map((item, i) => (
          <div
            key={i}
            className="bg-foreground/3 flex h-27 flex-col justify-between rounded-lg border-2 p-5"
          >
            <p className="font-bold">
              Order {item.id} is{" "}
              {statusFormatter[item.status as keyof typeof statusFormatter]}
            </p>
            <p className="text-sm font-light opacity-50">
              {formatDate(item.date, "time")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
