"use client";

import { useUsers } from "@/hooks/user/useUser";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import ActionSection from "./ActionSection";
import WorkerPagination from "./Pagination";
import WorkerTable from "./WorkerTable";

export default function ClientPage() {
  const { data: session } = useSession();
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useUsers({
    params: { role, outletId: session?.user?.outletId, search: debounceSearch },
  });
  
  return (
    <section>
      <ActionSection setSearch={setSearch} setRole={setRole} />
      <WorkerTable data={data} isPending={isPending} />
      <WorkerPagination />
    </section>
  );
}
