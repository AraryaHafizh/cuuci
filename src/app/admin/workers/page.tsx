import SectionInfo from "@/components/SectionInfo";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ActionSection } from "./ActionSection";
import { OrderTable } from "./OrderTable";

export default function Workers() {
  return (
    <main className="mt-50">
      <Greeting />
      <ActionSection />
      <OrderTable />
      <PaginationHistory />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Outlet Workers"
        description="Review your past orders and track the history of your laundry requests."
      />
    </section>
  );
}

function PaginationHistory() {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
