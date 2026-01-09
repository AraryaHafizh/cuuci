import ClientPage from "./ClientPage";

interface OrderDetailProps {
  params: Promise<{ id: string }>;
}

async function OrderDetail(props: OrderDetailProps) {
  const { id } = await props.params;

  return <ClientPage id={id} />;
}

export default OrderDetail;

export function HorizontalDetail({
  label,
  data,
}: {
  label: string;
  data: string;
}) {
  return (
    <div className="flex items-center justify-between gap-10 text-sm font-light">
      <p className="opacity-50">{label}</p>
      <p>{data}</p>
    </div>
  );
}

export function VerticalDetail({
  label,
  data,
}: {
  label: string;
  data: string;
}) {
  return (
    <div className="gap-10 text-sm font-light">
      <p className="opacity-50">{label}</p>
      <p>{data}</p>
    </div>
  );
}
