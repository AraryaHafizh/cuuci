import { AddressCard } from "@/components/AddressCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { Separator } from "@/components/ui/separator";
import { useAddress } from "@/hooks/address/useAddress";
import { Plus } from "lucide-react";
import { ProfileStore } from "./store";
import Address from "./AddressMenu";

export function AccountMenuDetail({ session }: { session: any }) {
  const index = ProfileStore((state) => state.index);
  const sessionData = session.user;

  const { data: addresses, isPending } = useAddress({ index });

  function Profile() {
    return (
      <div className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <div>
          <p>Profile Setting</p>
          <p className="text-sm font-light opacity-50">
            View and manage your personal information and account details.
          </p>
        </div>
        <Separator />

        <div className="w-full space-y-4">
          <Label>Full Name</Label>
          <Input placeholder={sessionData.name ?? "?"}></Input>
        </div>

        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </div>
    );
  }

  function Password() {
    return (
      <div className="rounded-2xl border bg-(--container-bg) p-5">
        <p>Update Password</p>
        <p className="text-sm font-light opacity-50">
          Update your account password to keep your profile secure.
        </p>
        <Separator className="my-5" />
        <div className="mb-5 gap-10 space-y-5 md:flex">
          <div className="w-full space-y-4">
            <Label>Old Password</Label>
            <Input placeholder="****"></Input>
          </div>
          <div className="w-full space-y-4">
            <Label>New Password</Label>
            <Input placeholder="****"></Input>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Update Password</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-2">
      {
        [
          <Profile />,
          <Password />,
          <Address isPending={isPending} addresses={addresses} />,
        ][index]
      }
    </div>
  );
}
