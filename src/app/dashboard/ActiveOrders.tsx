"use client";

import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useHistory } from "@/hooks/user/useHistory";
import { formatDate, formatOrderStatus } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ActiveOrders() {
  const { data, isPending } = useHistory({ params: { active: true } });
  const router = useRouter();

  return (
    <section className="flex-3 space-y-5 select-none">
      <SectionTitle title="Your Active Orders" />
      {isPending ? (
        <div className="flex h-[40vh] w-full items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : data === null || data.length === 0 ? (
        <div className="flex h-[40vh] w-full items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-sm opacity-50">No active orders.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {data.map((order: any, i: number) => {
            return (
              <div
                key={i}
                className="hover:bg-foreground/10 active:bg-foreground/10 cursor-pointer rounded-2xl border bg-(--container-bg) p-3 transition-all duration-300 xl:p-5"
                onClick={() => router.push(`/dashboard/orders/${order.id}`)}
              >
                <p className="text-xs xl:text-base">
                  Order {order.orderNumber}
                </p>
                <p className="mt-1 text-sm xl:text-lg">
                  {formatOrderStatus(order.status)}
                </p>
                <p className="text-xs opacity-50">
                  at {formatDate(order.updatedAt)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
