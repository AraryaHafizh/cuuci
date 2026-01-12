"use client";

import { useMetrics } from "@/hooks/summary/useMetrics";
import { formatNumber } from "@/lib/utils";

export default function Metrics() {
  const { data, isPending } = useMetrics();

  return (
    <section className="scroll-hidden mt-10 flex gap-5 overflow-x-auto">
      {isPending ? (
        <section className="bg-foreground/10 h-28 w-full animate-pulse rounded-2xl" />
      ) : data === null || data.length === 0 ? (
        <section className="bg-foreground/10 h-28 w-full rounded-2xl p-5">
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed">
            <p className="text-sm opacity-50">Metric data not available.</p>
          </div>
        </section>
      ) : (
        Object.entries(data).map(([key, value], i) => {
          const formatted =
            key === "revenue"
              ? `Rp. ${formatNumber(value as number)}`
              : formatNumber(value as number);

          return (
            <section
              key={i}
              className="flex min-w-fit flex-1 flex-col items-center justify-between space-y-4 rounded-2xl border bg-(--container-bg) px-7 py-5"
            >
              <p className="text-3xl font-bold">{formatted}</p>
              <p className="text-sm">{key}</p>
            </section>
          );
        })
      )}
    </section>
  );
}
