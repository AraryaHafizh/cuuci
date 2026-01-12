"use client";

import { useOutlets } from "@/hooks/outlet/useOutlet";
import { useState } from "react";
import ActionSection from "./components/ActionSection";
import OutletsTable from "./components/OutletsTable";
import OutletPagination from "./components/Pagination";
import { useDebounceValue } from "usehooks-ts";

export default function ClientPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useOutlets({
    params: { page, search: debounceSearch },
  });

  const outlets = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section>
      <ActionSection setSearch={setSearch} />
      <OutletsTable data={outlets} isPending={isPending} />
      {meta && (
              <OutletPagination
                meta={meta}
                onPageChange={setPage}
                isPending={isPending}
              />
            )}
    </section>
  );
}
