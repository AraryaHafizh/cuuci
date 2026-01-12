import ClientPage from "./ClientPage";

interface OrderDetailProps {
  params: Promise<{ id: string }>;
}

async function OrderDetail(props: OrderDetailProps) {
  const { id } = await props.params;

  return <ClientPage id={id} />;
}

export default OrderDetail;