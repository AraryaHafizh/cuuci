import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { useNearestOutlet } from "@/hooks/outlet/useNearestOutlet";
import { Check } from "lucide-react";
import { useEffect } from "react";

type SelectOutletProps = {
  addressId: string;
  value: string;
  onChange: (id: string) => void;
};

export function SelectOutlet({ addressId, value, onChange }: SelectOutletProps) {
  const { data: outlets, isLoading, error } = useNearestOutlet(addressId);

  console.log({ outlets, isLoading, error });

  useEffect(() => {
    if (outlets && outlets.length === 1 && !value) {
      onChange(outlets[0].id);
    }
  }, []);

  if (!addressId) {
    return (
      <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <SectionTitle title="Nearest Outlet" />
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground text-sm">
            Select an address first
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <SectionTitle title="Nearest Outlet" />
        <div className="bg-muted h-32 animate-pulse rounded-lg" />
      </section>
    );
  }

  if (error || !outlets) {
    return (
      <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <SectionTitle title="Nearest Outlet" />
        <p className="text-destructive text-sm">
          Failed to find nearest outlet
        </p>
      </section>
    );
  }

  if (outlets.length === 0) {
    return (
      <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <SectionTitle title="Nearest Outlet" />
        <div className="rounded-lg border border-dashed p-4">
          <p className="text-muted-foreground text-sm">
            No outlet available for this address
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Nearest Outlet" />
      <div className="space-y-3">
        {outlets.map((outlet: any) => (
          <Card
            key={outlet.id}
            onClick={() => onChange(outlet.id)}
            className={`hover:border-primary cursor-pointer p-4 transition-all ${
              value === outlet.id ? "border-primary bg-primary/5" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium">{outlet.name}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {outlet.address}
                </p>
                {outlet.distance && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    ~{outlet.distance.toFixed(1)} km away
                  </p>
                )}
              </div>
              {value === outlet.id && (
                <Check className="text-primary h-5 w-5" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}