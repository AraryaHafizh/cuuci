import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { Counter } from "@/components/ui/shadcn-io/counter";
import { useLaundryItem } from "@/hooks/laundry-item/useLaundryItem";
import { useArrivedOrder } from "@/hooks/order/useArrivedOrder";
import { AssignOrderBody, useAssignTask } from "@/hooks/order/useAssignTask";
import { formatDate, formatPhoneDb } from "@/lib/utils";
import { Trash, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function OrderDetail({
  index,
  setIndex,
}: {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [selectedItems, setSelectedItems] = useState<
    { id: string; qty: number }[]
  >([{ id: "", qty: 1 }]);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);

  const { data } = useArrivedOrder();
  const { mutateAsync: assignTask, isPending } = useAssignTask();
  const selected = data[index!];

  const addItem = () =>
    setSelectedItems([...selectedItems, { id: "", qty: 1 }]);
  const deleteItem = (i: number) =>
    setSelectedItems(selectedItems.filter((_, idx) => idx !== i));
  const updateItem = (i: number, id: string) =>
    setSelectedItems(
      selectedItems.map((v, idx) => (idx === i ? { ...v, id } : v)),
    );
  const updateQty = (i: number, qty: number) =>
    setSelectedItems(
      selectedItems.map((v, idx) => (idx === i ? { ...v, qty } : v)),
    );

  function onSubmit() {
    if (!price || price <= 0) {
      toast.error("Total price must be greater than 0");
      return;
    }

    if (!weight || weight <= 0) {
      toast.error("Total weight must be greater than 0");
      return;
    }

    if (!selectedItems || selectedItems.length === 0) {
      toast.error("Please add at least one order item");
      return;
    }

    if (selectedItems.some((item) => !item.id || item.qty <= 0)) {
      toast.error("Order items are invalid");
      return;
    }

    const body: AssignOrderBody = {
      orderItems: selectedItems,
      totalPrice: price,
      totalWeight: weight,
    };

    assignTask({
      orderId: selected.id,
      body,
    });
  }

  return (
    <section className="sticky top-25 z-10 h-fit space-y-5 rounded-2xl border bg-(--container-bg) p-5 md:top-40 md:flex-1 xl:flex-1">
      <Info setIndex={setIndex} data={selected} />
      <Items
        selectedItems={selectedItems}
        updateItem={updateItem}
        updateQty={updateQty}
        deleteItem={deleteItem}
        addItem={addItem}
      />
      <PW
        price={price}
        setPrice={setPrice}
        weight={weight}
        setWeight={setWeight}
      />
      <Button className="mt-5 w-full" onClick={onSubmit}>
        {isPending ? <LoadingAnimation /> : "Create task"}
      </Button>
    </section>
  );
}

function Info({ setIndex, data }: any) {
  const renderUser = (user: any, extra?: string) => (
    <div className="flex items-center gap-2">
      <div className="bg-foreground/5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-bold">
        {user.name[0]}
      </div>
      <div>
        <p>{user.name}</p>
        {extra && <p className="mt-1 opacity-50">{extra}</p>}
      </div>
    </div>
  );

  return (
    <section className="space-y-5">
      <div className="flex justify-between">
        <p className="text-sm md:text-base">Order Detail</p>
        <Button size="icon-sm" variant="outline" onClick={() => setIndex(null)}>
          <X />
        </Button>
      </div>

      <div className="space-y-2">
        <InfoCard title="Order Number" data={data.orderNumber} />
        <InfoCard title="Request time" data={formatDate(data.createdAt)} />
        <InfoCard title="Pickup time" data={formatDate(data.pickupTime)} />
      </div>

      <div className="space-y-2 text-xs md:text-sm">
        <p className="opacity-50">Customer Information</p>
        {renderUser(data.customer, data.address.address)}

        <p className="opacity-50">Driver Information</p>
        {renderUser(
          data.driver.driver,
          formatPhoneDb(data.driver.driver.phoneNumber),
        )}
      </div>
    </section>
  );
}

const InfoCard = ({ title, data }: { title: string; data: string }) => (
  <div className="flex justify-between text-xs opacity-50 md:text-sm">
    <p>{title}</p>
    <p>{data}</p>
  </div>
);

function Items({
  selectedItems,
  updateItem,
  updateQty,
  deleteItem,
  addItem,
}: {
  selectedItems: { id: string; qty: number }[];
  updateItem: (i: number, val: string) => void;
  updateQty: (i: number, val: number) => void;
  deleteItem: (i: number) => void;
  addItem: () => void;
}) {
  const { data } = useLaundryItem();
  const laundryItems = (data || []).map((l: any) => ({
    value: l.id,
    label: l.name,
  }));

  return (
    <section className="space-y-3">
      <p className="text-sm md:text-base">Order Items</p>
      {selectedItems.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <Combobox
            buttonClassName="flex-1"
            options={laundryItems}
            value={v.id}
            onChange={(val) => updateItem(i, val)}
            placeholder="Select item"
          />
          <Counter
            number={v.qty}
            setNumber={(num) => (num < 0 ? null : updateQty(i, num))}
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => deleteItem(i)}
            disabled={i === 0}
          >
            <Trash />
          </Button>
        </div>
      ))}
      <Button onClick={addItem} className="w-full" variant="secondary">
        Add Field
      </Button>
    </section>
  );
}

function PW({ price, setPrice, weight, setWeight }: any) {
  return (
    <section className="space-y-2">
      <p className="text-sm md:text-base">Order Price</p>
      <div className="flex gap-2">
        <Price price={price} setPrice={setPrice} />
        <Weight weight={weight} setWeight={setWeight} />
      </div>
    </section>
  );
}

function Price({ price, setPrice }: any) {
  const nf = new Intl.NumberFormat("id-ID");
  const handleChange = (e: any) =>
    setPrice(Number(e.target.value.replace(/\D/g, "")));
  return (
    <div className="relative flex-2">
      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm opacity-60">
        Rp
      </span>
      <Input
        placeholder="Total Price"
        className="pl-10"
        value={nf.format(price)}
        onChange={handleChange}
      />
    </div>
  );
}

function Weight({ weight, setWeight }: any) {
  return (
    <div className="relative flex-1">
      <Input
        placeholder="0"
        className="pr-10"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />
      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm opacity-60">
        kg
      </span>
    </div>
  );
}
