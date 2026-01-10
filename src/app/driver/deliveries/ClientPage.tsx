"use client";

import { useHistory } from "@/hooks/driver/useHIstory";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ActionSection } from "./ActionSection";
import { HistoryTable } from "./HistoryTable";
import DeliveryPagination from "./Pagination";

export default function ClientPage() {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useHistory({
    params: {
      type,
      status,
      search: debounceSearch,
    },
  });
  return (
    <section>
      <ActionSection
        setSearch={setSearch}
        setStatus={setStatus}
        setType={setType}
      />
      <HistoryTable data={data} isPending={isPending} />
      <DeliveryPagination />
    </section>
  );
}
