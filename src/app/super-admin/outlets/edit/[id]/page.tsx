import SectionInfo from "@/components/SectionInfo";
import { OutletEditInput } from "./OutletEditInput";

interface OutletEditProps {
  params: Promise<{ id: string }>;
}

async function OutletEdit(props: OutletEditProps) {
  const { id } = await props.params;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <OutletEditInput id={id} />
    </main>
  );

  function Greeting() {
    return (
      <SectionInfo
        title={`Edit Outlet ${id}`}
        description="Edit details and settings for an existing worker, driver, or outlet admin."
      />
    );
  }
}

export default OutletEdit;
