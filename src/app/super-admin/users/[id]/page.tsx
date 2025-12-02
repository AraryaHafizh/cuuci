import SectionInfo from "@/components/SectionInfo";
import { dummyUsers, userRole } from "../../data";
import UserDetailTable from "./components/UserDetailTable";

interface UserDetailProps {
  params: Promise<{ id: string }>;
}

async function UserDetail(props: UserDetailProps) {
  const { id } = await props.params;
  const userData = dummyUsers[2];

  return (
    <main className="mt-50">
      <Greeting />
      <section className="mt-20 flex gap-5">
        <UserInfo />
        <UserStats />
      </section>
      <UserDetailTable role={userData.role} />
    </main>
  );

  function Greeting() {
    return (
      <section className="space-y-10">
        <SectionInfo
          title={`User ${id} Detail`}
          description={`Manage and review all data associated with user ${id}.`}
          role={userRole[userData.role as keyof typeof userRole]}
        />
      </section>
    );
  }

  function UserInfo() {
    return (
      <section className="flex flex-1 items-center gap-5 rounded-2xl border bg-(--container-bg) p-5">
        <div className="bg-foreground/10 flex h-30 w-30 items-center justify-center rounded-full text-4xl">
          U
        </div>

        <div className="font-light">
          <p className="flex gap-5 text-2xl font-bold">User Name</p>
          <p>user@mail.com</p>
          <p>+62 81234567890</p>
        </div>
      </section>
    );
  }

  function UserStats() {
    function Widget({ title, data }: any) {
      return (
        <div className="bg-foreground/3 flex w-full flex-col items-center justify-center space-y-3 rounded-lg border p-10">
          <p className="text-5xl font-black">{data}</p>
          <p className="text-sm font-light opacity-50">{title}</p>
        </div>
      );
    }

    return (
      <section className="flex flex-2 gap-5 rounded-2xl border bg-(--container-bg) p-5">
        <Widget title="Available Requests" data="10" />
        <Widget title="Available Requests" data="10" />
        <Widget title="Available Requests" data="10" />
      </section>
    );
  }
}
export default UserDetail;
