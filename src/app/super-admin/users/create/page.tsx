import SectionInfo from "@/components/SectionInfo";
import { UserCreateInput } from "../components/UsersCreateInput";

export default function CreateUser() {
  return (
    <main className="mt-50">
      <Greeting />
      <UserCreateInput />
    </main>
  );
}

function Greeting() {
  return (
    <SectionInfo
      title="Create New User"
      description="Create new user for worker, driver, or admin."
    />
  );
}
