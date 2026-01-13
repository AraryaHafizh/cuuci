"use client";

import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useOrders } from "@/hooks/order/useOrders";
import { formatDate, formatOrderStatus } from "@/lib/utils";
import { statusFormatter } from "./data";
import { dummyData } from "../admin/data";

export const todayActivityKey = {
  newOrders: "New Orders",
  washing: "Washing",
  ironing: "Ironing",
  packing: "Packing",
  delivery: "Delivery",
};

export const orderStatusMap: Record<string, keyof typeof todayActivityKey> = {
  LOOKING_FOR_DRIVER: "newOrders",
  WAITING_FOR_PICKUP: "newOrders",
  LAUNDRY_ON_THE_WAY: "newOrders",
  ARRIVED_AT_OUTLET: "newOrders",

  WASHING: "washing",
  IRONING: "ironing",
  PACKING: "packing",

  WAITING_FOR_PAYMENT: "delivery",
  READY_FOR_DELIVERY: "delivery",
  DELIVERY_ON_THE_WAY: "delivery",
  COMPLETED: "delivery",
};

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

  const groupedOrders: Record<keyof typeof todayActivityKey, typeof orders> = {
    newOrders: [],
    washing: [],
    ironing: [],
    packing: [],
    delivery: [],
  };

  orders.forEach((order: any) => {
    const category = orderStatusMap[order.status];
    if (category) {
      groupedOrders[category].push(order);
    }
  });

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
        <div className="scroll-hidden mt-5 flex gap-10 overflow-x-auto text-sm">
          {Object.entries(todayActivityKey).map(([key, val], i) => {
            const activityData =
              groupedOrders[key as keyof typeof groupedOrders];

            return (
              <div key={i} className="min-w-60 flex-1 md:min-w-fit">
                <span className="flex gap-2">
                  {val}:{" "}
                  <p className="opacity-50">{activityData.length} items</p>
                </span>
                <div className="mt-2 space-y-5">
                  {activityData.map((item: any, i: number) => (
                    <div key={i} className="bg-foreground/3 rounded-2xl p-3">
                      <p className="text-sm font-medium opacity-50">
                        {item.outlet.name}
                      </p>
                      <p className="mb-1.5 text-lg font-bold">
                        Order {item.orderNumber}
                      </p>
                      <p>{formatOrderStatus(item.status)}</p>
                      <p className="opacity-50">{formatDate(item.updatedAt)}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
