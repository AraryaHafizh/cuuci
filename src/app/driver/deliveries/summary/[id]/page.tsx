import { SummaryInfoCard } from "@/components/InfoCard";
import SectionInfo from "@/components/SectionInfo";
import { SectionTitle } from "@/components/ui/section-title";
import { History, Image, Package } from "lucide-react";
import { SummaryButton } from "../../DeliveryButtons";

interface SummaryProps {
  params: Promise<{ id: string }>;
}

async function Summary(props: SummaryProps) {
  const { id } = await props.params;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 flex-row-reverse gap-5 space-y-5 xl:mt-20 xl:flex">
        <UploadProof />
        <div className="space-y-5">
          <DeliverySummary />
          <SummaryButton />
        </div>
      </section>
    </main>
  );

  function Greeting() {
    return (
      <section className="space-y-10">
        <SectionInfo
          title="Delivery Complete!"
          description="Review details, upload proof images, and confirm."
        />
      </section>
    );
  }

  function DeliverySummary() {
    const userCoor = [-6.2653, 106.7819];

    return (
      <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <SectionTitle title="Delivery Summary" />

        <SummaryInfoCard
          icon={<Package />}
          title={`Order ID ${id}`}
          value="Customer: Hoe Doi"
        />
        <SummaryInfoCard
          icon={<History />}
          title="Jl. in aja dulu, East Jakarta, Jakarta, 123405"
          value="03:50 PM | Oct 26"
        />
      </section>
    );
  }

  function UploadProof() {
    return (
      <section className="flex-2">
        <div className="bg-input/30 hover:bg-foreground/15 border-input flex h-[50vh] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-3 border-dashed transition duration-300">
          <Image size={70} className="opacity-50" />
          <p className="opacity-50">Upload proof</p>
        </div>
      </section>
    );
  }
}

export default Summary;
