"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
import { Info } from "lucide-react";
import { dummyUsers } from "../../data";
import { useRouter } from "next/navigation";

export default function UsersTable() {
  const route = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>No</TableHead>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Outlet ID</TableHead>
          <TableHead>Outlet Name</TableHead>
          <TableHead>Total Orders</TableHead>
          <TableHead>Attendances</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dummyUsers.map((user, i) => (
          <TableRow key={user.email} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>

            <TableCell>
              <img
                src={user.profilePictureUrl}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            </TableCell>

            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.role}</TableCell>

            <TableCell>{user.outletId ?? "-"}</TableCell>

            <TableCell>{user.outlet ?? "-"}</TableCell>

            <TableCell>
              {user.orders.length == 0 ? "-" : user.orders.length}
            </TableCell>

            <TableCell>{user.attendances?.length ?? "-"}</TableCell>

            <TableCell>
              {new Date(user.createdAt).toLocaleDateString("en-GB")}
            </TableCell>

            <TableCell>
              <ButtonGroup>
                <Button
                  variant="outline"
                  onClick={() => route.push(`users/edit/${user.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => route.push(`users/${user.id}`)}
                >
                  <Info />
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PaginationUsers() {
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
