"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatNumber } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { statusFormatter } from "../super-admin/data";
import { userStatus } from "../worker/data";
import { dummyData, todayActivityKey, workerStatus } from "./data";
import BypassOrder from "./BypassOrder";
import NewOrder from "./NewOrder";

const adminStatus = "active";

export default function Admin() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <Summary />
      <section className="mt-5 gap-5 space-y-5 lg:flex lg:space-y-0">
        <div className="flex flex-1 flex-col space-y-5">
          <Attendance />
          <OrderOverview />
        </div>
        <div className="flex flex-3 flex-col space-y-5">
          <WorkerActivity
            label="Worker Activities"
            data={dummyData.workerActivity}
          />
          <WorkerActivity
            label="Driver Activities"
            data={dummyData.driverActivity}
          />
        </div>
        <div className="flex-1 space-y-5">
          <BypassOrder />
          <NewOrder />
        </div>
      </section>
      <TodayActivities />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Welcome Back, Admin!"
        description="Monitor your outlet operations, manage orders, and handle incoming pickup requests with ease"
        role="Branch Tebet"
      />
    </section>
  );
}

function Attendance() {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <div className="flex justify-between">
        <p className="">Current Status</p>

        <span
          className={`flex items-center gap-1 ${userStatus[adminStatus].textColor}`}
        >
          <div
            className={`h-3 w-3 rounded-full ${userStatus[adminStatus].bgColor}`}
          ></div>
          {userStatus[adminStatus].text}
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
            className="flex min-w-fit flex-1 flex-col justify-between space-y-2 rounded-2xl border bg-(--container-bg) p-5"
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
    <section className="h-full rounded-2xl border bg-(--container-bg) p-5">
      <p>Order Status Overview</p>
      <div className="mt-5 text-sm">
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

function WorkerActivity({ label, data }: { label: string; data: any[] }) {
  return (
    <section className="h-full rounded-2xl border bg-(--container-bg) p-5">
      <p>{label}</p>
      <div className="mt-5 grid gap-5 text-sm md:grid-cols-2 xl:grid-cols-3">
        {data.map((worker, i) => {
          const selectedStatus =
            workerStatus[worker.status as keyof typeof workerStatus];

          return (
            <div key={i} className="flex justify-between">
              <p>{worker.name}</p>
              <p
                className={`${selectedStatus.text} ${selectedStatus.bg} rounded-xl px-2 py-1 text-xs`}
              >
                {selectedStatus.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TodayActivities() {
  return (
    <section className="mt-5 h-fit flex-3 rounded-2xl border bg-(--container-bg) p-5">
      <p>Today Activities</p>
      <div className="scroll-hidden mt-5 flex gap-5 overflow-x-auto text-sm">
        {Object.entries(todayActivityKey).map(([key, val], i) => {
          const activityData: any = dummyData[key as keyof typeof dummyData];

          return (
            <div key={i} className="min-w-60 flex-1 md:min-w-fit">
              <span className="flex gap-2">
                {val}: <p className="opacity-50">{activityData.length} items</p>
              </span>
              <div className="mt-2 space-y-5">
                {activityData.map((item: any, i: number) => (
                  <div key={i} className="bg-foreground/3 rounded-2xl p-3">
                    <p className="mb-1.5 text-lg font-bold">{item.id}</p>
                    <p>{item.customerName}</p>
                    <p className="opacity-50">
                      {formatDate(item.timestamp, "date")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
