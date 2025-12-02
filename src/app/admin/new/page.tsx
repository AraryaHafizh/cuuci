import SectionInfo from "@/components/SectionInfo";
import { NewOrders } from "./OrderList";

export default function Orders() {
  return (
    <main className="mt-50">
      <Greeting />
      <NewOrders />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="New Orders"
        description="Review your past orders and track the history of your laundry requests."
      />
    </section>
  );
}
