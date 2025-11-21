"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import {
  activeOrder,
  orderStatusColors,
  orderStatusIcons,
  orderStatusMessages,
  recentActivity,
} from "./data";
import { formatOrderStatus, formatTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  return (
    <main className="mt-50">
      <Greeting />
      <section className="mt-20 flex gap-10">
        <ActiveOrders />
        <RecentActivity />
      </section>
    </main>
  );
}

function Greeting() {
  const route = useRouter();

  return (
    <section className="space-y-10">
      <SectionInfo
        title="Hello, User!"
        description="Here's a summary of your laundry activities."
      />
      <Button onClick={() => route.push("/dashboard/orders/create")}>
        Schedule a New Pickup
      </Button>
    </section>
  );
}

function ActiveOrders() {
  return (
    <section className="flex-3 space-y-5">
      <p className="text-2xl font-bold">Your Active Orders</p>
      <div className="grid grid-cols-3 gap-3">
        {activeOrder.map((order: any, i: number) => {
          const StatusIcon = orderStatusIcons[order.status];
          const iconColor = orderStatusColors[order.status];

          return (
            <div key={i} className="rounded-2xl border bg-(--container-bg) p-5">
              <p className="text-lg font-bold">{order.id}</p>
              <span className="flex items-center gap-2">
                <StatusIcon className={`${iconColor} size-8`} />
                {formatOrderStatus(order.status)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RecentActivity() {
  return (
    <section className="flex-1 space-y-5">
      <p className="text-2xl font-bold">Recent Activity</p>
      <div className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        {recentActivity.map((activity: any, i: number) => {
          const StatusIcon = orderStatusIcons[activity.status];
          const iconColor = orderStatusColors[activity.status];
          const StatusMessage = orderStatusMessages[activity.status](
            activity.id,
          );
          return (
            <div key={i} className="flex space-x-5">
              <StatusIcon className={`${iconColor} size-8`} />
              <div>
                <p className="text-lg">{StatusMessage}</p>
                <p className="opacity-50">{formatTime(activity.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
