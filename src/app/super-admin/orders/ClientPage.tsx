"use client";

import { useOrders } from "@/hooks/order/useOrders";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ActionSection } from "./ActionSection";
import { OrderTable } from "./OrderTable";
import OrderPagination from "./Pagination";

export default function ClientPage() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useOrders({
    params: { status, search: debounceSearch, page, limit: 10 },
  });

  const orders = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section>
      <ActionSection setSearch={setSearch} setStatus={setStatus} />
      <OrderTable data={orders} isPending={isPending} />
      {meta && (
        <OrderPagination
          meta={meta}
          onPageChange={setPage}
          isPending={isPending}
        />
      )}
    </section>
  );
}
