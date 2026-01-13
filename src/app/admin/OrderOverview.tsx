"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { useOrderOverview } from "@/hooks/summary/useOrderOverview";
import { formatOrderStatus } from "@/lib/utils";

const ALL_STATUSES = [
  "LOOKING_FOR_DRIVER",
  "WAITING_FOR_PICKUP",
  "LAUNDRY_ON_THE_WAY",
  "ARRIVED_AT_OUTLET",
  "WASHING",
  "IRONING",
  "PACKING",
  "WAITING_FOR_PAYMENT",
  "READY_FOR_DELIVERY",
  "DELIVERY_ON_THE_WAY",
  "COMPLETED",
] as const;

export default function OrderOverview() {
  const { data, isPending } = useOrderOverview();

  return (
    <section className="flex flex-2 flex-col rounded-2xl border bg-(--container-bg) p-5 lg:pb-15">
      <SectionTitle title="Order Overview" />

      {isPending ? (
        <section className="bg-foreground/10 mt-5 h-full w-full animate-pulse rounded-2xl" />
      ) : (
        <section className="scroll-hidden h-full overflow-y-auto text-sm">
          {ALL_STATUSES.map((status, i) => {
            const count = data?.[status] ?? 0;

            return (
              <div
                key={i}
                className="mt-5 flex items-center justify-between gap-5"
              >
                <p>{formatOrderStatus(status)}</p>
                <div className="bg-foreground/10 h-0.5 flex-1 shrink-0" />
                <p>{count}</p>
              </div>
            );
          })}
        </section>
      )}
    </section>
  );
}
