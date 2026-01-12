"use client";

import { HorizontalDetail, VerticalDetail } from "@/app/admin/orders/[id]/page";
import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading-animation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDetail } from "@/hooks/user/useDetail";
import {
  formatDate,
  formatHistoryStatus,
  formatOrderStatus,
  formatPhoneDb,
} from "@/lib/utils";
import { Check, CircleDashed } from "lucide-react";

export default function ClientPage({ id }: { id: string }) {
  const { data, isPending } = useDetail(id);

  if (isPending) return <LoadingScreen />;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <section className="flex items-center justify-between">
        <Greeting data={data} isPending={isPending} />
        <div className="bg-background fixed bottom-0 left-0 z-2 w-full p-4 md:static md:w-fit">
          <PayButton data={data} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <OrderLog data={data} />

        <div className="gap-5 md:flex">
          <ItemTable data={data} />
          <div className="mt-5 flex-1 space-y-5 md:mt-0">
            <PaymentDetail data={data} />
            <CustomerDetail data={data} />
            <OutletDetail data={data} />
            <AddressDetail data={data} />
          </div>
        </div>
      </section>
    </main>
  );
}

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

function PayButton({ data }: { data: any }) {
  return (
    <Button
      disabled={
        !data.invoiceUrl || data.payment?.status === "SUCCESS" || !data.payment
      }
      onClick={() => {
        const url = data.invoiceUrl;
        window.open(url, "_blank");
      }}
      className="w-full py-6 md:py-2"
    >
      To payment page
    </Button>
  );
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

function CustomerDetail({ data }: { data: any }) {
  return (
    <section className="h-fit rounded-2xl border bg-(--container-bg) p-5">
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

function OutletDetail({ data }: { data: any }) {
  return (
    <section className="h-fit rounded-2xl border bg-(--container-bg) p-5">
      <p className="mb-2">Outlet Details</p>
      <HorizontalDetail label="Outlet" data={data.outlet.outletId} />
      <HorizontalDetail label="Outlet name" data={data.outlet.name} />
      <VerticalDetail label="Address" data={data.outlet.address} />
    </section>
  );
}

function AddressDetail({ data }: { data: any }) {
  return (
    <section className="flex-1 rounded-2xl border bg-(--container-bg) p-5">
      <p className="mb-2">Address</p>
      <VerticalDetail label="Customer" data={data.customer.name} />
      <VerticalDetail
        label="Contact"
        data={formatPhoneDb(data.customer.phoneNumber)}
      />
      <VerticalDetail label="Address" data={data.address.address} />
    </section>
  );
}

function PaymentDetail({ data }: { data: any }) {
  const nf = new Intl.NumberFormat("id-ID");

  return (
    <section className="h-fit rounded-2xl border bg-(--container-bg) p-5">
      <p className="mb-2">Payment Summary</p>
      <HorizontalDetail
        label="Status"
        data={formatOrderStatus(data.payment?.status || "Price Pending")}
      />
      <HorizontalDetail
        label="Laundry price"
        data={`Rp ${nf.format(data.totalPrice)}`}
      />
      <HorizontalDetail label="Delivery price" data={`Rp 10.000`} />
      <HorizontalDetail
        label="Subtotal"
        data={`Rp ${nf.format(data.totalPrice)}`}
      />
      <HorizontalDetail
        label="Subtotal"
        data={`Rp ${nf.format(data.totalPrice)}`}
      />
    </section>
  );
}
