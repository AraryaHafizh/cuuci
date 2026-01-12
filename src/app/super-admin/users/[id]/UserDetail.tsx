"use client";

import SectionInfo from "@/components/SectionInfo";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { useUser } from "@/hooks/user/useUser";
import { formatPhoneDb } from "@/lib/utils";
import { useState } from "react";
import { userRole } from "../../data";
import UserDetailTable from "./components/UserDetailTable";

export default function UserDetail({ userId }: { userId: string }) {
  const [page, setPage] = useState(1);
  const { data, isPending } = useUser({ id: userId, params: { page } });

  if (isPending) return <LoadingScreen />;

  const userData = data.data.user;
  const taskData = data.data.task;
  const meta = data.meta;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting data={userData} />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0 xl:mt-20">
        <UserInfo data={userData} />
        <UserStats data={userData} task={taskData} />
      </section>
      <UserDetailTable
        userId={userId}
        role={userData.role}
        tasks={taskData}
        meta={meta}
        setPage={setPage}
      />
    </main>
  );

  function Greeting({ data }: { data: any }) {
    return (
      <section className="space-y-10">
        <SectionInfo
          title={`${data.name} Detail`}
          description={`Manage and review all data associated with ${data.name}.`}
          role={userRole[data.role as keyof typeof userRole]}
        />
      </section>
    );
  }

  function UserInfo({ data }: { data: any }) {
    return (
      <section className="flex flex-1 items-center gap-10 rounded-2xl border bg-(--container-bg) py-5 pl-10">
        <div className="bg-foreground/10 flex h-30 w-30 items-center justify-center rounded-full text-4xl">
          {data.email[0].toUpperCase()}
        </div>

        <div className="font-light">
          <p className="flex gap-5 text-2xl font-bold">{data.name}</p>
          <p>{data.email}</p>
          <p>{formatPhoneDb(data.phoneNumber)}</p>
        </div>
      </section>
    );
  }

  function UserStats({ data, task }: { data: any; task: any }) {
    function Widget({ title, data }: any) {
      return (
        <div className="bg-foreground/3 flex w-full flex-col items-center justify-center space-y-3 rounded-lg border py-5 text-center lg:py-10 2xl:p-10">
          <p className="text-3xl font-black lg:text-4xl 2xl:text-5xl">{data}</p>
          <p className="text-xs font-light opacity-50 lg:text-sm">{title}</p>
        </div>
      );
    }

    if (data.role === "CUSTOMER") {
      return (
        <section className="flex flex-2 gap-5 rounded-2xl border bg-(--container-bg) p-5">
          <Widget title="Total Orders" data={task.length} />
        </section>
      );
    }
    if (data.role === "WORKER") {
      return (
        <section className="flex flex-2 gap-5 rounded-2xl border bg-(--container-bg) p-5">
          <Widget title="Finished tasks" data={task.length} />
        </section>
      );
    }
  }
}
