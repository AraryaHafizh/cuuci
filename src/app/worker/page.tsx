"use client";

import SectionInfo from "@/components/SectionInfo";
import { tasks, userStatus } from "./data";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";

const workerStatus = "active";
const role = "washing";

export default function Worker() {
  return (
    <main className="mt-50">
      <Greeting />
      <div className="mt-20 flex gap-10">
        <Attendance />
        <TaskWidget />
      </div>
      <WorkerTasks />
    </main>
  );
}

function Greeting() {
  return (
    <section className="flex space-y-10">
      <SectionInfo
        title="Welcome, Worker"
        description="View your active shift, manage orders, and stay updated with new tasks and requests."
        role={role}
      />
    </section>
  );
}

function Attendance() {
  return (
    <section className="flex-1 space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <div className="flex justify-between">
        <p className="">Current Status</p>

        <span
          className={`flex items-center gap-1 ${userStatus[workerStatus].textColor}`}
        >
          <div
            className={`h-3 w-3 rounded-full ${userStatus[workerStatus].bgColor}`}
          ></div>
          {userStatus[workerStatus].text}
        </span>
      </div>

      <div>
        <p className="text-xl font-medium">My shift</p>
        <p className="opacity-50">09:00 AM - 05:00 PM</p>
      </div>

      <div className="flex flex-col space-y-2">
        <Button variant="outline"> Start Shift</Button>
        <Button variant="destructive">End Shift</Button>
      </div>
    </section>
  );
}

function TaskWidget() {
  function Widget({ title, data }: any) {
    return (
      <div className="bg-background flex w-full flex-col items-center justify-center space-y-3 rounded-2xl border p-10">
        <p className="text-5xl font-black">{data}</p>
        <p className="text-sm font-light opacity-50">{title}</p>
      </div>
    );
  }

  return (
    <section className="flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <p>Today Tasks</p>
      <div className="mt-5 flex gap-5">
        <Widget title="To Wash" data="10" />
        <Widget title="In Progress" data="10" />
        <Widget title="Completed" data="10" />
      </div>
    </section>
  );
}

function WorkerTasks() {
  const filteredData = tasks.filter((task) => task.status === role);
  return (
    <section className="mt-10 space-y-5">
      <p>Available Tasks</p>
      <div className="grid grid-cols-4 gap-5">
        {filteredData.map((task: any, i) => (
          <TaskCard key={i} role={role} {...task} />
        ))}
      </div>
    </section>
  );
}
