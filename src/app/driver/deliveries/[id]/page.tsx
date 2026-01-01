import ClientPage from "./ClientPage";

interface DeliveryDetailProps {
  params: Promise<{ id: string }>;
}

async function DeliveryDetail(props: DeliveryDetailProps) {
  const { id } = await props.params;

  return <ClientPage id={id} />;
}

export default DeliveryDetail;
