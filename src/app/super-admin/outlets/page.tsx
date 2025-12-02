import SectionInfo from "@/components/SectionInfo";
import ActionSection from "./components/ActionSection";
import OutletsTable, { PaginationOutlets } from "./components/OutletsTable";

export default function Outlets() {
  return (
    <main className="mt-50">
      <Greeting />
      <ActionSection />
      <OutletsTable />
      <PaginationOutlets />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Outlets Management"
        description="View, create, and manage all laundry outlets."
      />
    </section>
  );
}
