"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { useHistory } from "@/hooks/driver/useHIstory";
import { useAvailablePickup } from "@/hooks/order/useAvailablePickup";

export function Overview() {
  const { data: deliveries, isPending } = useAvailablePickup();
  const { data: completed } = useHistory({
    params: { status: "COMPLETED" },
  });

  function Widget({
    title,
    data,
    tooltip,
  }: {
    title: string;
    data: any;
    tooltip?: string;
  }) {
    return (
      <div className="group bg-background relative flex w-full flex-col items-center justify-center rounded-2xl border py-5 lg:py-10 2xl:p-10">
        <div className="flex h-16 items-center justify-center">
          {isPending ? (
            <div className="bg-foreground/10 h-12 w-20 animate-pulse rounded-lg" />
          ) : typeof data === "string" || typeof data === "number" ? (
            <p className="text-3xl font-black lg:text-4xl 2xl:text-5xl">
              {data}
            </p>
          ) : (
            data
          )}
        </div>

        <p className="text-xs font-light opacity-50 lg:text-sm">{title}</p>

        {tooltip && (
          <div className="pointer-events-none absolute -top-2 left-1/2 z-50 -translate-x-1/2 -translate-y-full scale-95 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            {tooltip}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="rounded-2xl border bg-(--container-bg) p-5 lg:flex-2">
      <SectionTitle title="Today Overview" />

      <div className="mt-5 flex gap-5">
        <Widget title="Available Deliveries" data={deliveries?.length ?? 0} />
        <Widget title="Completed" data={completed?.data?.length ?? 0} />
      </div>
    </section>
  );
}
