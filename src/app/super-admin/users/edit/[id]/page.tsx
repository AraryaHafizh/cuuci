import SectionInfo from "@/components/SectionInfo";
import { UserEditInput } from "./UsersEditInput";

interface UserEditProps {
  params: Promise<{ id: string }>;
}

async function UserEdit(props: UserEditProps) {
  const { id } = await props.params;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <UserEditInput id={id} />
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
