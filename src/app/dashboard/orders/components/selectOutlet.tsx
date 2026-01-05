import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import OutletCard, { OutletProps } from "../create/OutletCard";

export function SelectOutlet({
  data = [],
  isPending,
  outletId,
  setOutletId,
}: {
  data: OutletProps[];
  isPending: boolean;
  outletId: string;
  setOutletId: (id: string) => void;
}) {
  return (
    <section className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Select Outlet Location" />

      {isPending ? (
        <div className="flex h-full min-h-52 items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : data.length === 0 ? (
        <p className="flex h-86 items-center justify-center font-light opacity-50">
          no outlets available.
        </p>
      ) : (
        data.map((outlet: any, i: number) => (
          <OutletCard
            key={i}
            data={outlet}
            outletId={outletId}
            setOutletId={setOutletId}
          />
        ))
      )}
    </section>
  );
}
