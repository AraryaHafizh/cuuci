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
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useDefault } from "@/hooks/address/useDefault";
import { useRemove } from "@/hooks/address/useRemove";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type AddressProps = {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
};

export function AddressCard({
  index,
  data,
}: {
  index: number;
  data: AddressProps;
}) {
  const router = useRouter()
  const { mutateAsync: setDefault, isPending } = useDefault();

  return (
    <div
      className={`bg-foreground/3 rounded-lg border p-5 transition duration-300 ${
        data.isPrimary
          ? "bg-primary/20"
          : "hover:bg-foreground/10 active:bg-foreground/10"
      } flex flex-col justify-between font-light`}
    >
      <div className="flex justify-between">
        <div className="w-[70%] space-y-2">
          <p className="text-sm">Address {index}</p>
          <p className="line-clamp-3 opacity-50">{data.address}</p>
        </div>
        {!data.isPrimary && (
          <p
            className="hover:text-primary active:text-primary h-fit text-xs font-medium opacity-50 transition-all duration-300 select-none hover:cursor-pointer hover:opacity-100 active:opacity-100"
            onClick={async () => {
              if (isPending) return;
              await setDefault({ id: data.id });
            }}
          >
            Set default
          </p>
        )}
      </div>
      <div className="flex justify-end gap-3 text-xs">
        <Link
          href={`/dashboard/account/${data.id}`}
          className="opacity-50 transition duration-300 hover:opacity-100 active:opacity-100"
        >
          Edit
        </Link>
        <DeleteConfirmation id={data.id}>
          <p className="hover:text-destructive active:text-destructive cursor-pointer opacity-50 transition duration-300 hover:opacity-100 active:opacity-100">
            Delete
          </p>
        </DeleteConfirmation>
      </div>
    </div>
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
          <AlertDialogTitle>Delete Address?</AlertDialogTitle>
          <AlertDialogDescription>
            You’re about to delete address. This action cannot be undone.
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
