"use client";

import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type ProgressState = "pending" | "in_progress";

type TaskStatus = "washing" | "ironing" | "packing" | "completed";

interface TaskItem {
  name: string;
  qty: number;
}

interface StationProgress {
  washing: ProgressState;
  ironing: ProgressState;
  packing: ProgressState;
}

interface TaskProps {
  id: string;
  role: string;
  userName: string;
  items: TaskItem[];
  status: TaskStatus;
  stationProgress: StationProgress;
}

export const StatusMap = {
  washing: {
    textColor: "text-primary",
    bgColor: "bg-primary/20",
  },
  ironing: {
    textColor: "text-amber-600",
    bgColor: "bg-amber-500/20",
  },
  packing: {
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-600/20",
  },
};

export default function TaskCard(data: TaskProps) {
  const router = useRouter();
  const status = data.status;
  const statusData = StatusMap[data.status as keyof typeof StatusMap];
  const progress =
    data.stationProgress[status as keyof typeof data.stationProgress];

  return (
    <div className="flex min-h-65 flex-col justify-between rounded-2xl border bg-(--container-bg) p-5 lg:min-h-70 2xl:min-h-85">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">{data.id}</p>
            <p className="font-light opacity-50">{data.userName}</p>
          </div>
          <div
            className={`rounded-2xl px-3 py-1 text-xs font-light 2xl:text-sm ${statusData.bgColor} ${statusData.textColor}`}
          >
            {status}
          </div>
        </div>
        <Separator className="my-2 2xl:my-5" />

        <p className="text-sm 2xl:text-base">Order items:</p>
        <div className="mt-2 grid grid-cols-2">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="text-sm font-light opacity-50 2xl:text-base"
            >
              {item.qty}x {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 lg:mt-0"></div>
      {progress === "pending" && <Button>Start {status}</Button>}
      {progress === "in_progress" && (
        <Button onClick={() => router.push(`worker/tasks/${data.id}/review`)}>
          Finish {status}
        </Button>
      )}
    </div>
  );
}
