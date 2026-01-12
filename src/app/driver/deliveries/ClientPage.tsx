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
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useHistory({
    params: {
      type,
      page,
      status,
      search: debounceSearch,
    },
  });

  const deliveries = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section>
      <ActionSection
        setSearch={setSearch}
        setStatus={setStatus}
        setType={setType}
      />
      <HistoryTable data={deliveries} isPending={isPending} />
      {meta && (
        <DeliveryPagination
          meta={meta}
          onPageChange={setPage}
          isPending={isPending}
        />
      )}
    </section>
  );
}
