"use client";

import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useArrivedOrder } from "@/hooks/order/useArrivedOrder";
import { BadgeDollarSign, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewOrder() {
  const { data, isPending } = useArrivedOrder();
  const router = useRouter();
  return (
    <section className="flex h-[350px] flex-col rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="New Orders" />
      <div className="mb-3"></div>
      {isPending ? (
        <div className="flex flex-1 items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : !data || data.length === 0 ? (
        <div className="flex h-full items-center justify-center rounded-2xl border">
          <p className="text-sm opacity-50">no new orders</p>
        </div>
      ) : (
        data.map((item: any, i: number) => (
          <div
            key={i}
            onClick={() => router.push("/admin/new")}
            className="hover:bg-foreground/8 active:bg-foreground/8 flex cursor-pointer items-center justify-between rounded-xl p-1 py-0.5 transition-all duration-300 select-none"
          >
            <p>Order {item.orderNumber}</p>
            <BadgeDollarSign className="text-primary" size={22} />
          </div>
        ))
      )}
    </section>
  );
}
