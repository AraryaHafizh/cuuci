"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { formatOrderStatus, formatTime } from "@/lib/utils";
import {
  activeOrder,
  orderStatusColors,
  orderStatusIcons,
  orderStatusMessages,
  recentActivity,
} from "./data";
import { Greeting } from "./Greeting";

export default function Dashboard() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0 xl:mt-20">
        <ActiveOrders />
        <RecentActivity />
      </section>
    </main>
  );
}



function ActiveOrders() {
  return (
    <section className="flex-3 space-y-5">
      <SectionTitle title="Your Active Orders" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {activeOrder.map((order: any, i: number) => {
          const StatusIcon = orderStatusIcons[order.status];
          const iconColor = orderStatusColors[order.status];

          return (
            <div
              key={i}
              className="rounded-2xl border bg-(--container-bg) p-2.5 2xl:p-5"
            >
              <p className="font-bold md:text-lg">{order.id}</p>
              <div className="mt-1 text-sm">
                <p>{formatOrderStatus(order.status)}</p>
                <p>John Doe</p>
              </div>
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
      <SectionTitle title="Recent Activity" />

      <div className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        {recentActivity.map((activity: any, i: number) => {
          const StatusIcon = orderStatusIcons[activity.status];
          const iconColor = orderStatusColors[activity.status];
          const StatusMessage = orderStatusMessages[activity.status](
            activity.id,
          );
          return (
            <div key={i} className="flex space-x-5">
              <StatusIcon className={`${iconColor} size-5 md:size-8`} />
              <div>
                <p className="text-sm xl:text-base">{StatusMessage}</p>
                <p className="text-xs opacity-50">
                  {formatTime(activity.date)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
