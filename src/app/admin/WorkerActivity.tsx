"use client";

import { useWorkerActivity } from "@/hooks/summary/useWorkerActivity";

export const statusMap = {
  null: { text: "text-foreground", label: "Idle" },
  WASHING: { text: "text-blue-500", label: "Washing" },
  IRONING: { text: "text-amber-600", label: "Ironing" },
  PACKING: { text: "text-emerald-500", label: "Packing" },
} as const;

export function WorkerActivities() {
  const { data, isPending } = useWorkerActivity();

  return (
    <div className="flex flex-3 flex-col space-y-5">
      <Activities
        label="Worker Activities"
        data={data?.workers}
        isPending={isPending}
      />
      <Activities
        label="Driver Activities"
        data={data?.drivers}
        isPending={isPending}
      />
    </div>
  );
}

function Activities({
  label,
  data = [],
  isPending,
}: {
  label: string;
  data?: any[];
  isPending: boolean;
}) {
  const isWorker = label === "Worker Activities";

  return (
    <section className="h-full w-full rounded-2xl border bg-(--container-bg) p-5 lg:pb-15">
      <p>{label}</p>

      {isPending ? (
        <Skeleton />
      ) : data.length === 0 ? (
        <EmptyState label={label} />
      ) : (
        <div className="mt-5 grid gap-5 text-sm md:grid-cols-2 xl:grid-cols-3">
          {data.map((item, i) => {
            const status = isWorker
              ? (statusMap[item.station as keyof typeof statusMap] ??
                statusMap.null)
              : {
                  text:
                    item.pickup || item.delivery
                      ? "text-emerald-500"
                      : "text-foreground",
                  label: item.pickup
                    ? "Pickup"
                    : item.delivery
                      ? "Delivery"
                      : "Idle",
                };

            return <Row key={i} name={item.name} status={status} />;
          })}
        </div>
      )}
    </section>
  );
}

function Row({
  name,
  status,
}: {
  name: string;
  status: { text: string; label: string };
}) {
  return (
    <div className="flex justify-between">
      <p>{name}</p>
      <p
        className={`${status.text} bg-foreground/10 rounded-xl px-2.5 py-0.5 text-xs`}
      >
        {status.label}
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <section className="bg-foreground/10 mt-4 h-full w-full animate-pulse rounded-2xl" />
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-5 flex h-50 items-center justify-center rounded-lg border-2 border-dashed lg:h-full">
      <p className="text-sm opacity-50">
        No {label.toLowerCase()} data available.
      </p>
    </div>
  );
}
