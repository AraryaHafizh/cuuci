import ItemCounter from "@/components/Counter";
import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CircleAlert, Image } from "lucide-react";

const items = [
  { item: "T-Shirt", qty: 5 },
  { item: "Jacket", qty: 1 },
  { item: "Socks", qty: 3 },
  { item: "Underwear", qty: 6 },
];

interface TaskReviewProps {
  params: Promise<{ id: string }>;
}

async function TaskReview(props: TaskReviewProps) {
  const { id } = await props.params;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting id={id} />
      <Caution />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0 xl:mt-20">
        <Items />
        <div className="flex-1 space-y-5">
          <Action />
          <Button className="w-full py-5">Finish task</Button>
        </div>
      </section>
    </main>
  );
}
export default TaskReview;

function Greeting({ id }: { id: string }) {
  return (
    <section className="space-y-10">
      <SectionInfo
        title={`Task ${id} Review`}
        description="Confirm the laundry items and report any mismatches before moving to the next stage."
      />
    </section>
  );
}

function Caution() {
  return (
    <section className="my-10">
      <div className="flex items-center gap-5 rounded-2xl border-2 border-amber-400 bg-amber-200/30 p-5 text-amber-400">
        <CircleAlert size={40} />
        <div>
          <p className="text-xl font-bold">Attention Before Submitting</p>
          <p className="text-foreground/60 font-light">
            Verify every item and ensure the total count is accurate. Any
            discrepancy must be reported and submitted for admin bypass.
          </p>
        </div>
      </div>
    </section>
  );
}

function Items() {
  return (
    <section className="flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Available Deliveries" className="mb-5" />
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between">
            <div className="w-full">
              <p className="font-bold md:text-xl">{item.item}</p>
              <p className="text-sm font-light opacity-50 md:text-base">
                Expected: {item.qty}
              </p>
            </div>
            <ItemCounter initialData={item.qty} />
          </div>
          {i !== items.length - 1 && <Separator className="my-3" />}
        </div>
      ))}
    </section>
  );
}

function Action() {
  return (
    <section className="h-fit rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Request Bypass" />

      <Textarea
        className="my-3 h-[20vh]"
        placeholder="Reason for bypass..."
      ></Textarea>
      <div className="bg-input/30 hover:bg-foreground/15 border-input flex h-[30vh] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-3 border-dashed transition duration-300">
        <Image size={70} className="opacity-50" />
        <p className="opacity-50">Upload proof</p>
      </div>
      <Button className="mt-5 w-full" variant={"destructive"}>
        Request Bypass
      </Button>
    </section>
  );
}
