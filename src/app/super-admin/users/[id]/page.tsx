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
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0 xl:mt-20">
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
        <div className="bg-foreground/3 flex w-full flex-col items-center justify-center space-y-3 rounded-lg border py-5 text-center lg:py-10 2xl:p-10">
          <p className="text-3xl font-black lg:text-4xl 2xl:text-5xl">{data}</p>
          <p className="text-xs font-light opacity-50 lg:text-sm">{title}</p>
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
