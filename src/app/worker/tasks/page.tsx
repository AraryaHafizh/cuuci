import SectionInfo from "@/components/SectionInfo";
import { Input } from "@/components/ui/input";
import { PaginationTask, TaskTable } from "./TaskTable";

export default function Task() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <ActionSection />
      <TaskTable />
      <PaginationTask />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Task History"
        description="Review your completed tasks and track your past work activity."
      />
    </section>
  );
}

function ActionSection() {
  return (
    <section className="my-10">
      <Input placeholder="Search by task id" />
    </section>
  );
}


