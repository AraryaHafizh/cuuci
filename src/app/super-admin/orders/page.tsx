import SectionInfo from "@/components/SectionInfo";
import ActionSection from "./components/ActionSection";
import OrdersTable, { PaginationOrders } from "./components/OrdersTable";

export default function Orders() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <ActionSection />
      <OrdersTable />
      <PaginationOrders />
    </main>
  );
}

function Greeting() {
  return (
    <SectionInfo
      title="Orders Management"
      description="View, create, and manage all laundry outlets."
    />
  );
}
