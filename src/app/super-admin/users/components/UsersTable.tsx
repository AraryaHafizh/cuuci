"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  LoadingAnimation,
  LoadingScreen,
} from "@/components/ui/loading-animation";
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
import { useUsers } from "@/hooks/user/useUser";
import { Info, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserProps } from "../props";
import { ReactNode } from "react";
import { useRemove } from "@/hooks/outlet/useRemove";

export default function UsersTable() {
  const router = useRouter();
  const { data, isPending } = useUsers();

  if (isPending)
    return (
      <div className="h-[560px]">
        <LoadingScreen isDashboard={true} />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex h-[560px] items-center justify-center rounded-2xl border">
        <p className="opacity-50">no data...</p>
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-none">
          <TableHead>No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Outlet Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-20"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((user: UserProps, i: number) => (
          <TableRow key={user.email} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>

            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{user.role}</TableCell>

            <TableCell>{user.outletName ?? "-"}</TableCell>

            <TableCell>
              {new Date(user.createdAt).toLocaleDateString("en-GB")}
            </TableCell>

            <TableCell>
              <ButtonGroup>
                <Button
                  size={"sm"}
                  variant="outline"
                  onClick={() => router.push(`users/edit/${user.id}`)}
                >
                  Edit
                </Button>
                <Button
                  size={"icon-sm"}
                  variant="outline"
                  onClick={() => router.push(`users/${user.id}`)}
                >
                  <Info />
                </Button>
                <DeleteConfirmation id={user.id}>
                  <Button variant={"destructive"} size={"icon-sm"}>
                    <Trash />
                  </Button>
                </DeleteConfirmation>
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

const DeleteConfirmation = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { mutateAsync: remove, isPending } = useRemove();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Outlet?</AlertDialogTitle>
          <AlertDialogDescription>
            You’re about to delete outlet. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={async () => {
              await remove({ id });
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "Escape" }),
              );
            }}
            variant={"outlineDestructive"}
          >
            {isPending ? <LoadingAnimation /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
