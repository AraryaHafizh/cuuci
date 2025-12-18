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
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useUsers({
    params: { role, search: debounceSearch },
  });

  return (
    <section>
      <ActionSection setSearch={setSearch} setRole={setRole} />
      <UsersTable data={data} isPending={isPending} />
      <UserPagination />
    </section>
  );
}
