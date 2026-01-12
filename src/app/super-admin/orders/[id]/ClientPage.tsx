"use client";

import SectionInfo from "@/components/SectionInfo";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDetailAdmin } from "@/hooks/user/useDetail";
import {
  formatDate,
  formatHistoryStatus,
  formatOrderStatus,
  formatPhoneDb,
} from "@/lib/utils";
import { Check, CircleDashed } from "lucide-react";

export default function ClientPage({ id }: { id: string }) {
  const { data, isPending } = useDetailAdmin(id);

  if (isPending) return <LoadingScreen />;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting data={data} isPending={isPending} />
      <OrderLog data={data} />
      <section className="mt-5 gap-5 md:flex">
        <div className="flex-4 space-y-5 overflow-x-auto">
          <ItemTable data={data} />
          <div className="gap-5 space-y-5 md:flex md:space-y-0">
            <Note data={data} />
            <CustomerDetail data={data} />
            <PaymentDetail data={data} />
          </div>
        </div>

        <div className="mt-5 flex-1 space-y-5 md:mt-0">
          <AddressDetail data={data} />
          <AssignmentDetail data={data} />
        </div>
      </section>
    </main>
  );

  function Greeting({ data, isPending }: { data: any; isPending: boolean }) {
    return (
      <SectionInfo
        title={`Order Detail`}
        description="View detailed information, track progress, and manage the order."
        loading={isPending}
        role={formatOrderStatus(data.status)}
      />
    );
  }
}

function OrderLog({ data }: { data: any }) {
  return (
    <section className="mt-15 space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Order Logs</p>
      <div className="scroll-hidden flex justify-around gap-5 overflow-x-auto">
        {data.orderLog.map((log: any, i: number) => {
          const Icon = log.status === "COMPLETED" ? Check : CircleDashed;

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
                  {formatHistoryStatus(log.process)}
                </p>
                <p className="opacity-50">
                  {log.name
                    ? `${formatDate(log.at, "date")} by ${log.name ?? "-"}`
                    : "Not assigned"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ItemTable({ data }: { data: any }) {
  return (
    <section className="h-fit flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <p className="mb-5">Order Items</p>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-none">
            <TableHead>No</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!data?.orderItems || data.orderItems.length === 0 ? (
            <TableRow className="h-52">
              <TableCell
                colSpan={3}
                className="text-muted-foreground py-10 text-center"
              >
                Order not yet received by outlet.
              </TableCell>
            </TableRow>
          ) : (
            data.orderItems.map((item: any, i: number) => (
              <TableRow key={i} className="border-none">
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.laundryItem.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}

function Note({ data }: { data: any }) {
  return (
    <section className="flex-1 rounded-2xl border bg-(--container-bg) p-5">
      <p>Order notes</p>
      <div className="mt-3 text-sm font-light">
        <p className="opacity-50">From {data.customer.name}</p>
        <p>
          {data.notes?.find((n: any) => n.type === "INSTRUCTION")?.body ?? "-"}
        </p>
      </div>
    </section>
  );
}

function CustomerDetail({ data }: { data: any }) {
  return (
    <section className="h-fit flex-1 rounded-2xl border bg-(--container-bg) p-5">
      <p className="mb-2">Customer Details</p>
      <HorizontalDetail label="Order id" data={data.orderNumber} />
      <HorizontalDetail label="Customer" data={data.customer.name} />
      <HorizontalDetail
        label="Contact"
        data={formatPhoneDb(data.customer.phoneNumber)}
      />
      <HorizontalDetail
        label="Order Date"
        data={formatDate(data.createdAt, "date")}
      />
    </section>
  );
}

function AddressDetail({ data }: { data: any }) {
  return (
    <section className="flex-1 rounded-2xl border bg-(--container-bg) p-5">
      <p className="mb-2">Addresses Details</p>
      <VerticalDetail label="Customer" data={data.customer.name} />
      <VerticalDetail
        label="Contact"
        data={formatPhoneDb(data.customer.phoneNumber)}
      />
      <VerticalDetail label="Address" data={data.address.address} />

      <Separator className="my-2" />

      <VerticalDetail label="Outlet" data={data.outlet.name} />
      <VerticalDetail
        label="Contact"
        data={formatPhoneDb(data.outlet.admin.phoneNumber)}
      />
      <VerticalDetail label="Address" data={data.outlet.address} />
    </section>
  );
}

function AssignmentDetail({ data }: { data: any }) {
  return (
    <section className="flex-1 rounded-2xl border bg-(--container-bg) p-5">
      <p>Assignments</p>
      <HorizontalDetail label="Outlet" data={data.outlet.name} />
      <HorizontalDetail label="Outlet Admin" data={data.outlet.admin.name} />
      <HorizontalDetail label="Driver" data={data.orderLog[1]?.name || "-"} />
      <HorizontalDetail label="Washing" data={data.orderLog[2]?.name || "-"} />
      <HorizontalDetail label="Ironing" data={data.orderLog[3]?.name || "-"} />
      <HorizontalDetail label="Packing" data={data.orderLog[4]?.name || "-"} />
      <HorizontalDetail label="Delivery" data={data.orderLog[5]?.name || "-"} />
    </section>
  );
}

function PaymentDetail({ data }: { data: any }) {
  const nf = new Intl.NumberFormat("id-ID");
  const paymentStatus = data?.payment?.status;

  return (
    <section className="flex flex-1 flex-col rounded-2xl border bg-(--container-bg) p-5">
      <p className="mb-4">Payment Summary</p>

      {!paymentStatus ? (
        <div className="flex min-h-32 flex-1 items-center justify-center rounded-2xl border-3 border-dashed text-sm md:min-h-0">
          <p className="opacity-50">Price Pending</p>
        </div>
      ) : (
        <>
          <HorizontalDetail
            label="Status"
            data={formatOrderStatus(paymentStatus)}
          />
          <HorizontalDetail
            label="Laundry price"
            data={`Rp ${nf.format(data.totalPrice)}`}
          />
          <HorizontalDetail label="Delivery price" data="Rp 10.000" />
          <HorizontalDetail
            label="Subtotal"
            data={`Rp ${nf.format(data.totalPrice)}`}
          />
        </>
      )}
    </section>
  );
}

export function HorizontalDetail({
  label,
  data,
}: {
  label: string;
  data: string;
}) {
  return (
    <div className="flex items-center justify-between gap-10 text-sm font-light">
      <p className="opacity-50">{label}</p>
      <p>{data}</p>
    </div>
  );
}

export function VerticalDetail({
  label,
  data,
}: {
  label: string;
  data: string;
}) {
  return (
    <div className="gap-10 text-sm font-light">
      <p className="opacity-50">{label}</p>
      <p>{data}</p>
    </div>
  );
}
