import { WorkerDetail } from "./WorkerDetail";

interface UserDetailProps {
  params: Promise<{ id: string }>;
}

async function UserDetail(props: UserDetailProps) {
  const { id } = await props.params;

  return <WorkerDetail userId={id} />;
}
export default UserDetail;
