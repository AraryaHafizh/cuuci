import ClientPage from "./ClientPage";

interface OutletEditProps {
  params: Promise<{ id: string }>;
}

async function OutletEdit(props: OutletEditProps) {
  const { id } = await props.params;

  return <ClientPage id={id} />;
}

export default OutletEdit;
