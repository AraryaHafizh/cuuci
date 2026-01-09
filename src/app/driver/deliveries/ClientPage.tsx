"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useHistory } from "@/hooks/driver/useHIstory";
import { HistoryTable } from "./HistoryTable";
import DeliveryPagination from "./Pagination";
import { ActionSection } from "./ActionSection";

export default function ClientPage() {
  const { data: session } = useSession();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useHistory({
    params: {
      status,
      outletId: session?.user?.outletId,
      search: debounceSearch,
    },
  });
  return (
    <section>
      <ActionSection setSearch={setSearch} setStatus={setStatus} />
      <HistoryTable data={data} isPending={isPending}/>
      <DeliveryPagination />
    </section>
  );
}
