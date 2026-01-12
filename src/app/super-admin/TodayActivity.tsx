"use client";

import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useOrders } from "@/hooks/order/useOrders";
import { formatDate } from "@/lib/utils";
import { statusFormatter } from "./data";

export function TodayActivities() {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, isPending } = useOrders({
    params: {
      startDate: startOfDay.toISOString(),
      endDate: endOfDay.toISOString(),
    },
  });

  const orders = data?.data ?? [];

  return (
    <section className="mt-5 h-fit flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <p>Today Activities</p>
      {isPending ? (
        <div className="flex h-100 items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : orders === null || orders.length === 0 ? (
        <div className="mt-5 flex h-90 items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-sm opacity-50">No activities for today.</p>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((item: any, i: number) => (
            <div
              key={i}
              className="bg-foreground/3 flex h-27 flex-col justify-between rounded-lg border-2 p-5"
            >
              <p className="font-bold">
                Order {item.orderNumber} is{" "}
                {statusFormatter[item.status as keyof typeof statusFormatter]}
              </p>
              <p className="text-sm font-light opacity-50">
                {formatDate(item.createdAt, "time")}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
