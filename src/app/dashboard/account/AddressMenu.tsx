"use client";

import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateAddress from "./CreateAddress";
import { AddressCard } from "./AddressCard";

export default function Address({
  isPending,
  addresses,
}: {
  isPending: boolean;
  addresses: any[];
}) {
  const [create, setCreate] = useState<boolean>(false);

  if (create) return <CreateAddress setCreate={setCreate} />;

  return (
    <Addresses
      isPending={isPending}
      addresses={addresses}
      setCreate={setCreate}
    />
  );
}

function Addresses({
  isPending,
  addresses,
  setCreate,
}: {
  isPending: boolean;
  addresses: any[];
  setCreate: (value: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border bg-(--container-bg) p-5">
      <div className="items-center justify-between md:flex">
        <div>
          <p>Manage My Address</p>
          <p className="text-sm font-light opacity-50">
            Add, edit, or remove your saved addresses for faster checkout.
          </p>
        </div>
        <Button
          size={"sm"}
          className="mt-5 w-full text-xs md:mt-0 md:w-fit"
          onClick={() => setCreate(true)}
        >
          <Plus />
          Create Address
        </Button>
      </div>
      <Separator className="my-5" />
      {isPending ? (
        <div className="h-[500px]">
          <LoadingScreen isDashboard={true} />
        </div>
      ) : (
        <div className="grid gap-2 lg:grid-cols-2">
          {addresses.map((item: any, i: number) => (
            <AddressCard key={i} index={i + 1} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function EditAddress() {
  return <div></div>;
}
