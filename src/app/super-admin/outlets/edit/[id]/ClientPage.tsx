"use client";

import { LoadingScreen } from "@/components/ui/loading-animation";
import { useOutlet } from "@/hooks/outlet/useOutlet";
import { OutletEditInput } from "./OutletEditInput";
import SectionInfo from "@/components/SectionInfo";

export default function ClientPage({ id }: { id: string }) {
  const { data, isPending } = useOutlet(id);

  if (isPending) return <LoadingScreen />;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting data={data} />
      <OutletEditInput data={data} />
    </main>
  );
}

function Greeting({ data }: { data: any }) {
  return (
    <SectionInfo
      title={`Edit ${data.name}`}
      description="Edit outlet details."
    />
  );
}
