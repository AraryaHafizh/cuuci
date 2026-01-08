"use client";

import { useOrders } from "@/hooks/order/useOrders";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ActionSection } from "./ActionSection";
import { OrderTable } from "./OrderTable";
import OrderPagination from "./Pagination";

export default function ClientPage() {
  const { data: session } = useSession();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useOrders({
    params: { status, outletId: session?.user?.outletId, search: debounceSearch },
  });

  return (
    <section>
      <ActionSection setSearch={setSearch} setStatus={setStatus} />
      <OrderTable data={data} isPending={isPending} />
      <OrderPagination />
    </section>
  );
}
