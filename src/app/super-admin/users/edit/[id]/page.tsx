import SectionInfo from "@/components/SectionInfo";
import { UserCreateInput } from "../../components/UsersCreateInput";

interface UserEditProps {
  params: Promise<{ id: string }>;
}

async function UserEdit(props: UserEditProps) {
  const { id } = await props.params;

  return (
    <main className="mt-50">
      <Greeting />
      <UserCreateInput />
    </main>
  );

  function Greeting() {
    return (
      <SectionInfo
        title={`Edit User ${id}`}
        description="Edit details and settings for an existing worker, driver, or outlet admin."
      />
    );
  }
}

export default UserEdit;
