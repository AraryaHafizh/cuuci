import { AddressCard } from "@/components/AddressCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { userAddress } from "./data";
import { ProfileStore } from "./store";

export function AccountMenuDetail({ session }: { session: any }) {
  const index = ProfileStore((state) => state.index);
  const sessionData = session.user;

  function Profile() {
    return (
      <div className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <div>
          <p className="font-medium">Profile Setting</p>
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
        <p className="font-medium">Update Password</p>
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

  function Address() {
    return (
      <div className="rounded-2xl border bg-(--container-bg) p-5">
        <div className="items-center justify-between md:flex">
          <div>
            <p className="font-medium">Manage My Address</p>
            <p className="text-sm font-light opacity-50">
              Add, edit, or remove your saved addresses for faster checkout.
            </p>
          </div>
          <Button size={"sm"} className="mt-5 w-full text-xs md:mt-0 md:w-fit">
            <Plus />
            Add New Address
          </Button>
        </div>
        <Separator className="my-5" />
        <div className="grid gap-2 lg:grid-cols-2">
          {userAddress.map((item, i) => (
            <AddressCard key={i} {...item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-2">
      {[<Profile />, <Password />, <Address />][index]}
    </div>
  );
}
