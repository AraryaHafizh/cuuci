import { normalizeRole } from "@/app/super-admin/users/components/UsersTable";
import { UserProps } from "@/app/super-admin/users/props";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading-animation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkerTable({
  data,
  isPending,
}: {
  data: any;
  isPending: boolean;
}) {
  const router = useRouter();

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
          <TableHead className="w-15"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((user: UserProps, i: number) => (
          <TableRow key={user.email} className="border-none">
            <TableCell className="font-medium">{i + 1}</TableCell>

            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{normalizeRole(user.role)}</TableCell>

            <TableCell>{user.outletName ?? "-"}</TableCell>

            <TableCell>
              {new Date(user.createdAt).toLocaleDateString("en-GB")}
            </TableCell>

            <TableCell>
              <Button
                size={"icon-sm"}
                variant="outline"
                onClick={() => router.push(`workers/${user.id}`)}
              >
                <Info />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
