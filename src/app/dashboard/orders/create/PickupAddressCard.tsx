export type AddressProps = {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
};

export function PickupAddressCard({
  index,
  data,
  addressId,
  setAdressId,
}: {
  index: number;
  data: AddressProps;
  addressId: string;
  setAdressId: (id: string) => void;
}) {
  const selected = addressId === data.id;

  return (
    <div
      className={`bg-foreground/3 rounded-lg border-2 p-2.5 transition duration-300 2xl:p-4 ${
        selected
          ? "bg-primary/20 border-primary"
          : "hover:bg-foreground/10 active:bg-foreground/10"
      } flex h-28 flex-col font-light select-none hover:cursor-pointer`}
      onClick={() => setAdressId(data.id)}
    >
      <p className="text-sm">Address {index}</p>
      <p className="line-clamp-3 text-sm opacity-50">{data.address}</p>
    </div>
  );
}
