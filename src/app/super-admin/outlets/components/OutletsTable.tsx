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
import { useOutlets } from "@/hooks/outlet/useOutlet";
import { useRemove } from "@/hooks/outlet/useRemove";
import { Trash } from "lucide-react";
import { ReactNode } from "react";
import { OutletProps } from "../props";
import { useRouter } from "next/navigation";

export function OutletsTable() {
  const router = useRouter();
  const { data, isPending } = useOutlets();

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
          <TableHead>Outlet ID</TableHead>
          <TableHead>Outlet Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Outlet Admin</TableHead>
          <TableHead>Total Orders</TableHead>
          <TableHead>Active Workers</TableHead>
          <TableHead>Active Drivers</TableHead>
          <TableHead className="w-20"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((outlet: OutletProps, i: number) => (
          <TableRow key={i} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{outlet.outletId}</TableCell>
            <TableCell>{outlet.name}</TableCell>
            <TableCell className="max-w-32 truncate">
              {outlet.address}
            </TableCell>
            <TableCell>{outlet.admin?.name ?? "unassign"}</TableCell>
            <TableCell>{outlet.orders.length}</TableCell>
            <TableCell>{outlet.workers.length}</TableCell>
            <TableCell>{outlet.drivers.length}</TableCell>
            <TableCell>
              <ButtonGroup>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => router.push(`outlets/edit/${outlet.id}`)}
                >
                  Edit
                </Button>
                <DeleteConfirmation id={outlet.id}>
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

export function PaginationOutlets() {
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
