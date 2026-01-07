"use client";

import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { Separator } from "@/components/ui/separator";
import { useArrivedOrder } from "@/hooks/order/useArrivedOrder";
import { useState } from "react";
import { OrderDetail } from "./OrderDetail";

export function NewOrders() {
  const [index, setIndex] = useState<number | null>(null);
  const { data, isPending } = useArrivedOrder();

  if (isPending)
    return (
      <div className="h-[560px]">
        <LoadingScreen isDashboard={true} />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="mt-10 flex h-[60vh] items-center justify-center rounded-2xl border">
        <p className="opacity-50">no new order available</p>
      </div>
    );

  return (
    <section className="mt-10 flex gap-5">
      <OrderList data={data} index={index} setIndex={setIndex} />
      {index !== null && <OrderDetail index={index} setIndex={setIndex} />}
    </section>
  );
}

function OrderList({
  data,
  index,
  setIndex,
}: {
  data: any;
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <section
      className={`grid ${index !== null ? "w-0 md:w-[40vw] md:grid-cols-1 xl:w-fit xl:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"} h-fit gap-5 md:flex-1 xl:flex-2`}
    >
      {data.map((item: any, i: number) => (
        <div key={i} className="rounded-2xl border bg-(--container-bg) p-5">
          <p className="mb-2 font-light opacity-50">Order {item.orderNumber}</p>
          <p className="text-lg font-medium">{item.customer.name}</p>
          <p className="text-sm font-light opacity-50">
            {item.address.address}
          </p>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <span className="flex gap-1 text-sm">
              <p className="opacity-50">Driver: </p> {item.driver.driver.name}
            </span>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => setIndex(i)}
            >
              Process Order
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
}
