import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { Separator } from "@/components/ui/separator";
import { useAddress } from "@/hooks/address/useAddress";
import Address from "./AddressMenu";
import { ProfileStore } from "./store";
import { useEdit, userUpdateProps } from "@/hooks/user/useEdit";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { formatPhone } from "@/lib/utils";
import { toast } from "sonner";
import { InputPhoneNumber } from "./NoPhone";

export function AccountMenuDetail() {
  const { data: session } = useSession();
  const index = ProfileStore((state) => state.index);
  const sessionData = session!.user;
  const isPhoneEmpty = !sessionData.phoneNumber?.trim();

  const { data: addresses, isPending } = useAddress({ index });

  function Profile() {
    const { mutateAsync: edit, isPending } = useEdit();
    const [name, setName] = useState(sessionData.name ?? "");
    const [phone, setPhone] = useState(sessionData.phoneNumber ?? "");

    async function onSave() {
      const payload: userUpdateProps = {};

      if (name !== sessionData.name) payload.name = name;
      if (phone !== sessionData.phoneNumber)
        payload.phoneNumber = `+62${phone}`;

      if (Object.keys(payload).length === 0) {
        toast("Nothing to update");
        return;
      }

      await edit(payload);
    }

    return (
      <div className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
        <div>
          <p>Profile Setting</p>
          <p className="text-sm font-light opacity-50">
            View and manage your personal information and account details.
          </p>
        </div>

        <Separator />

        <div className="gap-5 space-y-5 md:flex md:space-y-0">
          <div className="w-full space-y-4">
            <Label>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="w-full space-y-4">
            <Label>Phone Number</Label>
            <div className="relative flex-2">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs opacity-60 md:text-sm">
                +62
              </span>
              <Input
                placeholder={phone}
                className="pl-10"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formatPhone(phone ?? "")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setPhone(raw);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onSave} disabled={isPending}>
            {isPending ? <LoadingAnimation /> : "Save"}
          </Button>
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
    <>
      {isPhoneEmpty && <InputPhoneNumber />}

      <div className="flex-2">
        {
          [
            <Profile />,
            <Password />,
            <Address isPending={isPending} addresses={addresses} />,
          ][index]
        }
      </div>
    </>
  );
}
