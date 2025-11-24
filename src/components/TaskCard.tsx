"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

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
  pending: {
    label: "New",
    textColor: "text-blue-700",
    bgColor: "bg-blue-700/15",
  },
  in_progress: {
    label: "In Progress",
    textColor: "text-foreground",
    bgColor: "bg-foreground/15",
  },
};

export default function TaskCard(data: TaskProps) {
  const route = useRouter();

  const statusData =
    StatusMap[data.stationProgress[data.role as keyof StationProgress]];
  return (
    <div className="flex min-h-85 flex-col justify-between rounded-2xl border bg-(--container-bg) p-5">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">{data.id}</p>
            <p className="font-light opacity-50">{data.userName}</p>
          </div>
          <div
            className={`px-4 py-1 ${statusData.bgColor} rounded-2xl ${statusData.textColor} text-sm font-light`}
          >
            {statusData.label}
          </div>
        </div>
        <Separator className="my-5" />
        <p>Order items:</p>
        {data.items.map((item, i) => (
          <p key={i} className="font-light opacity-50">
            {item.qty}x {item.name}
          </p>
        ))}
      </div>
      {statusData.label === "New" && <Button>Start {data.role}</Button>}
      {statusData.label === "In Progress" && (
        <Button onClick={() => route.push(`worker/tasks/${data.id}/review`)}>
          Finish {data.role}
        </Button>
      )}
    </div>
  );
}
