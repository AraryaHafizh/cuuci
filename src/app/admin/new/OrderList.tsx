"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { dummyNew } from "../data";
import { OrderDetail } from "./OrderDetail";

export function NewOrders() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section className="mt-10 flex gap-5">
      <OrderList setIndex={setIndex} />
      {index !== null && <OrderDetail index={index} setIndex={setIndex} />}
    </section>
  );
}

function OrderList({
  setIndex,
}: {
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <section className={`grid grid-cols-2 gap-5`}>
      {dummyNew.map((item, i) => (
        <div key={i} className="rounded-2xl border bg-(--container-bg) p-5">
          <div className="flex justify-between">
            <div>
              <p className="mb-2 text-sm opacity-50">{item.id}</p>
              <p className="text-lg">{item.customerName}</p>
              <p className="opacity-50">{item.address}</p>
            </div>
            <div className="flex flex-col items-end text-sm font-light">
              <p>1.5 km away</p>
              <p className="opacity-50">{formatDate(item.timestamp)}</p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <span className="flex gap-1 text-sm">
              <p className="opacity-50">Driver: </p> {item.driver}
            </span>
            <Button size={"sm"} onClick={() => setIndex(i)}>
              Process Order
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
}
