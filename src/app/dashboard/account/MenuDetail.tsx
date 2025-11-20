import { AddressCard } from "@/components/AddressCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { userAddress } from "./data";
import { ProfileStore } from "./store";

export function AccountMenuDetail() {
  const index = ProfileStore((state) => state.index);

  function Profile() {
    return (
      <div className="rounded-2xl border bg-(--container-bg) p-5">
        <p className="text-xl font-bold">Profile Setting</p>
        <p className="font-light opacity-50">
          View and manage your personal information and account details.
        </p>
        <Separator className="my-5" />

        <div className="mb-5 flex gap-10">
          <div className="w-full space-y-4">
            <Label>First Name</Label>
            <Input></Input>
          </div>
          <div className="w-full space-y-4">
            <Label>Last Name</Label>
            <Input></Input>
          </div>
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
        <p className="text-xl font-bold">Update Password</p>
        <p className="font-light opacity-50">
          Update your account password to keep your profile secure.
        </p>
        <Separator className="my-5" />
        <div className="mb-5 flex gap-10">
          <div className="w-full space-y-4">
            <Label>Old Password</Label>
            <Input></Input>
          </div>
          <div className="w-full space-y-4">
            <Label>New Password</Label>
            <Input></Input>
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
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">Manage My Address</p>
            <p className="font-light opacity-50">
              Add, edit, or remove your saved addresses for faster checkout.
            </p>
          </div>
          <Button size={"sm"} className="text-xs">
            <Plus />
            Add New Address
          </Button>
        </div>
        <Separator className="my-5" />
        <div className="grid grid-cols-2 gap-2">
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
