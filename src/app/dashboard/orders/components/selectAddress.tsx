import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { PickupAddressCard } from "../create/PickupAddressCard";

export function SelectAddress({
  data,
  isPending,
  addressId,
  setAdressId,
}: {
  data: any;
  isPending: boolean;
  addressId: string;
  setAdressId: (id: string) => void;
}) {
  return (
    <section className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Where to Pick Up?" />
      {isPending ? (
        <div className="flex h-full min-h-52 items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="space-y-5">
          {data.length === 0 ? (
            <p className="flex h-86 items-center justify-center font-light opacity-50">
              no address available. please create one.
            </p>
          ) : (
            Array.from({ length: data.length }).map((_, i) => (
              <PickupAddressCard
                key={i}
                index={i + 1}
                data={data[i]}
                addressId={addressId}
                setAdressId={setAdressId}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}
