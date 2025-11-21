import SectionInfo from "@/components/SectionInfo";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { taskHistory } from "./data";

export default function Task() {
  return (
    <main className="mt-50">
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

function TaskTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>Task ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Completed At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {taskHistory.map((task) => (
          <TableRow key={task.id} className="border-none">
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell>{task.userName}</TableCell>
            <TableCell>
              {task.items.reduce((sum, item) => sum + item.qty, 0)} items
            </TableCell>
            <TableCell className="capitalize">{task.status}</TableCell>
            <TableCell>{new Date(task.completedAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function PaginationTask() {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
