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
import { deliveryHistory } from "../data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Delivery() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <ActionSection />
      <DeliveryTable />
      <PaginationDelivery />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Delivery History"
        description="Review your completed delivery and track your past deliveries."
      />
    </section>
  );
}

function ActionSection() {
  return (
    <section className="my-10">
      <Input placeholder="Search by delivery id" />
    </section>
  );
}

function DeliveryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Picked Up At</TableHead>
          <TableHead>Delivered At</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Total Time</TableHead>
          <TableHead className="text-center">Proof</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {deliveryHistory.map((delivery) => (
          <TableRow key={delivery.orderId} className="border-none">
            <TableCell className="font-medium">{delivery.orderId}</TableCell>
            <TableCell>{delivery.customerName}</TableCell>
            <TableCell>{delivery.address}</TableCell>
            <TableCell className="capitalize">
              {delivery.deliveryStatus}
            </TableCell>
            <TableCell>{formatDate(delivery.pickupDateTime)}</TableCell>
            <TableCell>{formatDate(delivery.deliveryDateTime)}</TableCell>
            <TableCell>{delivery.numberOfItems}</TableCell>
            <TableCell>{delivery.totalWeight}</TableCell>
            <TableCell>{delivery.distance}</TableCell>
            <TableCell>{delivery.duration}</TableCell>
            <TableCell>
              {
                <Button variant={"ghost"} size={"sm"}>
                  view
                </Button>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function PaginationDelivery() {
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
