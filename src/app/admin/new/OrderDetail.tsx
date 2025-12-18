import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Counter } from "@/components/ui/shadcn-io/counter";
import { Trash, X } from "lucide-react";
import { useState } from "react";
import { dummyNew } from "../data";

export function OrderDetail({
  index,
  setIndex,
}: {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <section className="sticky top-25 z-10 h-fit flex-1 rounded-2xl border bg-(--container-bg) p-5 md:top-40">
      <Info index={index} setIndex={setIndex} />
      <Separator className="my-5" />
      <Items />
      <Separator className="my-5" />
      <Price />
      <Button className="mt-5 w-full">Submit Order</Button>
    </section>
  );
}

function Info({
  index,
  setIndex,
}: {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const data = dummyNew[index!];

  return (
    <section>
      <div className="flex justify-between">
        <p>Order Detail</p>
        <Button
          size={"icon-sm"}
          variant={"outline"}
          onClick={() => setIndex(null)}
        >
          <X />
        </Button>
      </div>

      <div className="mt-5 text-sm">
        <p className="mb-2 opacity-50">Customer Information</p>
        <div className="flex items-center gap-2">
          <div className="bg-foreground/5 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
            {data.customerName[0]}
          </div>
          <div>
            <p>{data.customerName}</p>
            <p className="mt-1">+62 0812 3456 7890</p>
            <p>{data.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 text-sm">
        <p className="mb-2 opacity-50">Driver Information</p>
        <div className="flex items-center gap-2">
          <div className="bg-foreground/5 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
            {data.driver[0]}
          </div>
          <div>
            <p>{data.driver}</p>
            <p className="mt-1">+62 0812 3456 7890</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Items() {
  const [items, setItems] = useState<string[]>([""]);
  const [numbers, setNumbers] = useState<number[]>([0]);

  const handleChange = (value: string, index: number) => {
    const copy = [...items];
    copy[index] = value;
    setItems(copy);
  };

  const addInput = () => {
    setItems([...items, ""]);
    setNumbers([...numbers, 0]);
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const updateCounter = (index: number, value: number) => {
    if (value < 0) return;
    const copy = [...numbers];
    copy[index] = value;
    setNumbers(copy);
  };

  return (
    <section className="">
      <p>Order Items</p>

      <div className="mt-5 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <Input
              type="text"
              value={item}
              onChange={(e) => handleChange(e.target.value, i)}
              placeholder={`Item ${i + 1}`}
            />

            <div className="flex items-center gap-1">
              <Counter
                number={numbers[i]}
                setNumber={(v) => updateCounter(i, v)}
              />

              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => deleteItem(i)}
                disabled={i === 0}
              >
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addInput} className="mt-2 w-full" variant={"secondary"}>
        Add Field
      </Button>
    </section>
  );
}

function Price() {
  const [raw, setRaw] = useState("");
  const nf = new Intl.NumberFormat("id-ID");

  const handleChange = (e: any) => {
    const value = e.target.value;
    const numeric = value.replace(/\D/g, "");

    setRaw(numeric);
  };
  return (
    <section>
      <p>Order Price</p>

      <div className="mt-5 flex gap-5">
        <div className="relative flex-2">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm opacity-60">
            Rp
          </span>
          <Input
            placeholder="Total Price"
            className="pl-10"
            value={nf.format(Number(raw))}
            onChange={handleChange}
          />
        </div>
        <div className="relative flex-1">
          <Input placeholder="Total Weight" className="pr-10" />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm opacity-60">
            kg
          </span>
        </div>
      </div>
    </section>
  );
}
