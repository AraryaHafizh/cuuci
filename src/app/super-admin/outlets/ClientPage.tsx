"use client";

import { useOutlets } from "@/hooks/outlet/useOutlet";
import { useState } from "react";
import ActionSection from "./components/ActionSection";
import OutletsTable from "./components/OutletsTable";
import OutletPagination from "./components/Pagination";
import { useDebounceValue } from "usehooks-ts";

export default function ClientPage() {
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useOutlets({
    params: { search: debounceSearch },
  });

  return (
    <section>
      <ActionSection setSearch={setSearch} />
      <OutletsTable data={data} isPending={isPending} />
      <OutletPagination />
    </section>
  );
}
