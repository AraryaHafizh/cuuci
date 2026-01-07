import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useEdit } from "@/hooks/user/useEdit";
import { formatPhone } from "@/lib/utils";
import { useState } from "react";

export const InputPhoneNumber = () => {
  const { mutateAsync: edit, isPending } = useEdit();
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(true);

  async function onSubmit() {
    if (!phone) return;

    await edit({ phoneNumber: `+62${phone}` });
    setOpen(false);
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Please add phone number first</AlertDialogTitle>
          <AlertDialogDescription>
            Before continuing, please add your phone number.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs opacity-60">
            +62
          </span>
          <Input
            className="pl-10"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formatPhone(phone)}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setPhone(raw);
            }}
          />
        </div>

        <AlertDialogFooter>
          <Button onClick={onSubmit} disabled={!phone || isPending}>
            {isPending ? <LoadingAnimation /> : "Save"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
