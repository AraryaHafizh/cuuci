import EditAddress from "./EditAddress";

interface EditAddressPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAddressPage(props: EditAddressPageProps) {
  const { id } = await props.params;
  return <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
  <EditAddress id={id} />
  </main>
}