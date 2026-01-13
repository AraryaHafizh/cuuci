import UserDetail from "@/app/super-admin/users/[id]/UserDetail";

interface UserDetailProps {
  params: Promise<{ id: string }>;
}

async function Page(props: UserDetailProps) {
  const { id } = await props.params;

  return <UserDetail userId={id} />;
}
export default Page;
