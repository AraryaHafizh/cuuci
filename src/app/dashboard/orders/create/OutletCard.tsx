export type OutletProps = {
  distance: number;
  id: string;
  outletId: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  adminId: string | null;
};

export default function OutletCard({
  data,
  outletId,
  setOutletId,
}: {
  data: OutletProps;
  outletId: string;
  setOutletId: (id: string) => void;
}) {
  const selected = outletId === data.id;

  return (
    <div
      className={`bg-foreground/3 rounded-lg border-2 p-2.5 transition duration-300 2xl:p-4 ${
        selected
          ? "bg-primary/20 border-primary"
          : "hover:bg-foreground/10 active:bg-foreground/10"
      } flex h-28 flex-col font-light select-none hover:cursor-pointer`}
      onClick={() => setOutletId(data.id)}
    >
      <div className="flex justify-between">
        <div className="flex-2">
          <p className="mb-1 text-sm font-medium md:text-base">{data.name}</p>
          <p className="line-clamp-2 text-sm opacity-50">{data.address}</p>
        </div>
        <p className="flex-1 text-right text-xs">
          {data.distance.toFixed(2)} km
        </p>
      </div>
    </div>
  );
}
