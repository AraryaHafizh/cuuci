import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function ActionSection({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  return (
    <section className="mt-10 mb-5 flex gap-2">
      <Input
        placeholder="Search outlet"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={() => router.push("outlets/create")}>
        Create Outlet
      </Button>
    </section>
  );
}
