"use client";

import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { useNotification } from "@/hooks/notification/useNotification";
import { formatTime } from "@/lib/utils";

export function RecentActivity() {
  const { data, isPending } = useNotification({ params: {} });

  return (
    <section className="flex-1 space-y-5">
      <SectionTitle title="Recent Activity" />

      {isPending ? (
        <div className="flex h-[40vh] w-full items-center justify-center rounded-2xl bg-(--container-bg)">
          <LoadingAnimation />
        </div>
      ) : data === null || data.length === 0 ? (
        <div className="flex h-[40vh] w-full items-center justify-center rounded-lg border-2 border-dashed bg-(--container-bg)">
          <p className="text-sm opacity-50">No recent activity.</p>
        </div>
      ) : (
        <div className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
          {data.map((activity: any, i: number) => {
            return (
              <div key={i}>
                <p className="text-xs md:text-sm">{activity.title}</p>
                <p className="text-sm xl:text-base">{activity.description}</p>
                <p className="mt-1 text-xs opacity-50">
                  {formatTime(activity.createdAt)}
                </p>
                {i !== data.length - 1 && <Separator className="mt-5" />}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
