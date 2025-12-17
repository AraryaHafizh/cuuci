"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { userStatus } from "./data";
import AvailableTasks from "./AvailableTasks";

const workerStatus = "active";

export default function Worker() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0 xl:mt-20">
        <Attendance />
        <TaskWidget />
      </section>
      <AvailableTasks />
    </main>
  );
}

function Greeting() {
  return (
    <section className="flex space-y-10">
      <SectionInfo
        title="Welcome, Worker"
        description="View your active shift, manage orders, and stay updated with new tasks and requests."
      />
    </section>
  );
}

function Attendance() {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5 lg:flex-1">
      <div className="flex justify-between">
        <SectionTitle title="Current Status" />

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
      <div className="bg-background flex w-full flex-col items-center justify-center space-y-3 rounded-2xl border py-5 lg:py-10 2xl:p-10">
        <p className="text-3xl font-black lg:text-4xl 2xl:text-5xl">{data}</p>
        <p className="text-xs font-light opacity-50 lg:text-sm">{title}</p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border bg-(--container-bg) p-5 lg:flex-2">
      <SectionTitle title="Today Tasks" />

      <div className="mt-5 flex gap-5">
        <Widget title="To Wash" data="10" />
        <Widget title="In Progress" data="10" />
        <Widget title="Completed" data="10" />
      </div>
    </section>
  );
}
