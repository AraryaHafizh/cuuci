import SectionInfo from "@/components/SectionInfo";
import ActionSection from "./components/ActionSection";
import UsersTable, { PaginationUsers } from "./components/UsersTable";

export default function Users() {
  return (
    <main className="mt-50">
      <Greeting />
      <ActionSection />
      <UsersTable />
      <PaginationUsers />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Users Management"
        description="View, create, and manage all laundry outlets."
      />
    </section>
  );
}
