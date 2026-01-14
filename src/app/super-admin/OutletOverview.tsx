"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { useOutletOverview } from "@/hooks/summary/useOutletOverview";
import { formatNumber } from "@/lib/utils";

export default function OutletOverview() {
  const { data, isPending } = useOutletOverview();

  return (
    <section className="rounded-2xl border bg-(--container-bg) p-5 lg:w-[45%] lg:pb-15">
      <SectionTitle title="Outlet Overview" />

      {isPending ? (
        <section className="bg-foreground/10 mt-5 h-full w-full animate-pulse rounded-2xl" />
      ) : data === null || data.length === 0 ? (
        <div className="mt-5 flex h-50 items-center justify-center rounded-lg border-2 border-dashed lg:h-full">
          <p className="text-sm opacity-50">No outlet data available.</p>
        </div>
      ) : (
        <section className="scroll-hidden h-full overflow-x-auto overflow-y-auto text-sm">
          {data.map((item: any, i: number) => (
            <section
              key={i}
              className="mt-5 flex w-full items-center space-x-4"
            >
              <p className="shrink-0">{item.name}</p>
              <div className="bg-foreground/10 h-0.5 flex-1 shrink-0" />
              <div className="flex space-x-4 font-light">
                <p className="shrink-0">
                  total orders: {formatNumber(item.orders)}
                </p>
                <p className="shrink-0">
                  total drivers: {formatNumber(item.drivers)}
                </p>
                <p className="shrink-0">
                  total workers: {formatNumber(item.workers)}
                </p>
              </div>
            </section>
          ))}
        </section>
      )}
    </section>
  );
}
