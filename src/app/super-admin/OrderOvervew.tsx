"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { useOrderOverview } from "@/hooks/summary/useOrderOverview";
import { formatOrderStatus } from "@/lib/utils";

export default function OrderOverview() {
  const { data, isPending } = useOrderOverview();

  return (
    <section className="rounded-2xl border bg-(--container-bg) p-5 lg:w-[35%] lg:pb-15">
      <SectionTitle title="Order Overview" />

      {isPending ? (
        <section className="bg-foreground/10 mt-5 h-full w-full animate-pulse rounded-2xl" />
      ) : data === null || data.length === 0 ? (
        <div className="mt-5 flex h-50 items-center justify-center rounded-lg border-2 border-dashed lg:h-full">
          <p className="text-sm opacity-50">No order data available.</p>
        </div>
      ) : Object.keys(data).length > 0 ? (
        <section className="scroll-hidden h-full overflow-y-auto text-sm">
          {Object.entries(data).map(([status, count], i) => (
            <div
              key={i}
              className="mt-5 flex items-center justify-between gap-5"
            >
              <p>{formatOrderStatus(status)}</p>
              <div className="bg-foreground/10 h-0.5 flex-1 shrink-0" />
              <p>{Number(count)}</p>
            </div>
          ))}
        </section>
      ) : (
        <p className="mt-5 text-center text-sm opacity-50">No orders yet</p>
      )}
    </section>
  );
}
