"use client";

import TaskCard from "@/components/TaskCard";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useTasks } from "@/hooks/worker/useTask";

export default function AvailableTasks() {
  const { data, isPending } = useTasks();

  if (isPending)
    return (
      <div className="h-[560px]">
        <LoadingScreen isDashboard={true} />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="mt-10 flex h-[560px] items-center justify-center rounded-2xl border">
        <p className="opacity-50">no available tasks...</p>
      </div>
    );

  return (
    <section className="mt-10 space-y-5">
      <SectionTitle title="Available Tasks" />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data.map((task: any, i: number) => (
          <TaskCard key={i} {...task} />
        ))}
      </div>
    </section>
  );
}
