"use client";

import { useHistory } from "@/hooks/worker/useHistory";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ActionSection } from "./ActionSection";
import { PaginationTask, TaskTable } from "./TaskTable";

export default function ClientPage() {
  const { data: session } = useSession();
  const [status, setStatus] = useState("");
  const [station, setStation] = useState("");
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useHistory({
    params: {
      station,
      status,
      outletId: session?.user?.outletId,
      search: debounceSearch,
    },
  });
  return (
    <section>
      <ActionSection setSearch={setSearch} setStatus={setStatus} setStation={setStation}/>
      <TaskTable data={data} isPending={isPending} />
      <PaginationTask />
    </section>
  );
}
