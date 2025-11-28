import SectionInfo from "@/components/SectionInfo";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Check, CircleDashed } from "lucide-react";
import { ItemTable } from "./components/ItemTable";
import { OrderLogs } from "./components/OrderLogs";
import { BypassRequest } from "./components/BypassRequest";
import { dummyLog } from "@/app/super-admin/orders/data";
import { filterStatus } from "../../data";

interface OrderDetailProps {
  params: Promise<{ id: string }>;
}

async function OrderDetail(props: OrderDetailProps) {
  const { id } = await props.params;

  return (
    <main className="mt-50">
      <Greeting />
      <OrderLog />
      <section className="mt-5 flex gap-5">
        <div className="flex-4 space-y-5 overflow-x-auto">
          <ItemTable />
          <BypassRequest />
          <OrderLogs />
        </div>

        <div className="flex-1 space-y-5">
          <CustomerDetail />
          <AddressDetail />
          <AssignmentDetail />
          <PaymentDetail />
        </div>
      </section>
    </main>
  );

  function Greeting() {
    return (
      <SectionInfo
        title={`Order ${id} Detail`}
        description="View detailed information, track progress, and manage the order."
        role="Ironing"
      />
    );
  }
}

export default OrderDetail;

function OrderLog() {
  return (
    <section className="mt-15 space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Order Logs</p>
      <div className="scroll-hidden flex gap-5 overflow-x-auto">
        {dummyLog.map((log, i) => {
          const Icon = log.assigned ? Check : CircleDashed;

          return (
            <div
              key={i}
              className="flex min-w-fit items-center gap-2 text-sm font-light"
            >
              <div className="bg-primary/30 text-primary rounded-full p-4">
                <Icon strokeWidth={3} />
              </div>
              <div>
                <p className="font-normal">
                  {filterStatus[log.status as keyof typeof filterStatus]}
                </p>
                {log.assigned === null ? (
                  "-"
                ) : (
                  <p className="opacity-50">
                    {formatDate(log.timestamp, "date")} by
                    {log.assigned}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CustomerDetail() {
  return (
    <section className="h-fit rounded-2xl border bg-(--container-bg) p-5">
      <p>Customer & Order Details</p>
      <HorizontalDetail label="Customer" data="John Doe" />
      <HorizontalDetail label="Contact" data="+62 812 3456 7890" />
      <HorizontalDetail
        label="Order Date"
        data={formatDate("2025-11-26 09:00", "date")}
      />
    </section>
  );
}

function AddressDetail() {
  return (
    <section className="flex-1 rounded-2xl border bg-(--container-bg) p-5">
      <p>Addresses</p>
      <VerticalDetail label="Customer" data="John Doe" />
      <VerticalDetail label="Contact" data="+62 812 3456 7890" />
      <VerticalDetail
        label="Address"
        data="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, atque."
      />
    </section>
  );
}

function AssignmentDetail() {
  return (
    <section className="flex-1 rounded-2xl border bg-(--container-bg) p-5">
      <p>Assignments</p>
      <HorizontalDetail label="Outlet" data="Outlet A" />
      <HorizontalDetail label="Outlet Admin" data="Jonathan" />
      <HorizontalDetail label="Driver" data="John Doe" />
    </section>
  );
}

function PaymentDetail() {
  return (
    <section className="h-fit rounded-2xl border bg-(--container-bg) p-5">
      <p>Payment Summary</p>
      <HorizontalDetail label="Subtotal" data="$30.50" />
      <HorizontalDetail label="Tax (5%)" data="$2.50" />
      <HorizontalDetail label="Delivery Fee" data="$5.00" />
      <Separator className="my-2" />
      <HorizontalDetail label="Total" data="$99.00" />
    </section>
  );
}

function HorizontalDetail({ label, data }: { label: string; data: string }) {
  return (
    <div className="flex items-center justify-between gap-10 text-sm font-light">
      <p className="opacity-50">{label}</p>
      <p>{data}</p>
    </div>
  );
}

function VerticalDetail({ label, data }: { label: string; data: string }) {
  return (
    <div className="gap-10 text-sm font-light">
      <p className="opacity-50">{label}</p>
      <p>{data}</p>
    </div>
  );
}
