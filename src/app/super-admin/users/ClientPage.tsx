"use client";

import { useUsers } from "@/hooks/user/useUser";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import ActionSection from "./components/ActionSection";
import UserPagination from "./components/Pagination";
import UsersTable from "./components/UsersTable";

export default function ClientPage() {
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useUsers({
    params: { role, page, search: debounceSearch },
  });

  const users = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section>
      <ActionSection setSearch={setSearch} setRole={setRole} />
      <UsersTable data={users} isPending={isPending} />
      {meta && (
        <UserPagination
          meta={meta}
          onPageChange={setPage}
          isPending={isPending}
        />
      )}
    </section>
  );
}
