import SectionInfo from "@/components/SectionInfo";
import { Input } from "@/components/ui/input";
import { HistoryOrderTable, PaginationHistory } from "./historyOrderTable";

export default function History() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <ActionSection />
      <HistoryOrderTable />
      <PaginationHistory />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="My Order History"
        description="Review your past orders and track the history of your laundry requests."
      />
    </section>
  );
}

function ActionSection() {
  return (
    <section className="my-10">
      <Input placeholder="Search by order id" />
    </section>
  );
}


