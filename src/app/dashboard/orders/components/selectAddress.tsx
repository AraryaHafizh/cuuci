import { Card } from "@/components/ui/card";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useAddress } from "@/hooks/address/useAddress";
import { Check, MapPin } from "lucide-react";

type SelectAddressProps = {
  value: string;
  onChange: (id: string) => void;
};

export function SelectAddress({ value, onChange }: SelectAddressProps) {
  const { data: addresses, isLoading, error } = useAddress();
  if (isLoading) return <p>Loading...</p>;
  if (error || !addresses) return <p>Error</p>;
  console.log({ addresses, isLoading, error });
  return (
    <section className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Where to Pick Up?" />
      {isLoading ? (
        <div className="flex h-full min-h-52 items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <Card
              key={addr.id}
              onClick={() => onChange(addr.id)}
              className={`hover:border-primary cursor-pointer p-4 transition-all ${
                value === addr.id ? "border-primary bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <p className="font-medium">{addr.label || "Address"}</p>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {addr.address}
                  </p>
                </div>
                {value === addr.id && (
                  <Check className="text-primary h-5 w-5" />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}