import SectionInfo from "@/components/SectionInfo";
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
import { formatDate, formatOrderStatus } from "@/lib/utils";
import { orderHistory } from "./data";
import { Input } from "@/components/ui/input";

export default function History() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <ActionSection />
      <HistoryTable />
      <PaginationHistory />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="My Order History"
        description="Review your past orders and track the history of your laundry requests."
      />
    </section>
  );
}

function ActionSection() {
  return (
    <section className="my-10">
      <Input placeholder="Search by order id" />
    </section>
  );
}

function HistoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>Order ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Service Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderHistory.map((order) => (
          <TableRow key={order.orderId} className="border-none">
            <TableCell className="font-medium">{order.orderId}</TableCell>
            <TableCell>{formatDate(order.orderDate, "date")}</TableCell>
            <TableCell>{order.serviceType}</TableCell>
            <TableCell>{formatOrderStatus(order.status)}</TableCell>
            <TableCell>{order.paymentStatus}</TableCell>
            <TableCell className="text-right">${order.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function PaginationHistory() {
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
