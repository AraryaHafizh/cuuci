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
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { useCreate } from "@/hooks/laundry-item/useCreate";
import { useLaundryItem } from "@/hooks/laundry-item/useLaundryItem";
import { useRemove } from "@/hooks/laundry-item/useRemove";
import { Plus, Trash } from "lucide-react";
import { ReactNode, useState } from "react";

export function LaundryItems() {
  const { data, isPending } = useLaundryItem();
  const { mutateAsync: remove } = useRemove();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleRemove(id: string) {
    if (deletingId) return;

    setDeletingId(id);
    try {
      await remove(id);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="flex flex-1 flex-col rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Laundry items" />

      <div className="flex min-h-0 flex-1 flex-col pt-4">
        {isPending ? (
          <div className="flex flex-1 items-center justify-center">
            <LoadingAnimation />
          </div>
        ) : data === null || data.length === 0 ? (
          <div className="mt-5 flex h-50 items-center justify-center rounded-lg border-2 border-dashed lg:h-full">
            <p className="text-sm opacity-50">No laundry data available.</p>
          </div>
        ) : (
          <div className="scroll-hidden min-h-0 flex-1 overflow-y-auto text-sm">
            {data.map((item: any) => (
              <div
                key={item.id}
                className="hover:bg-foreground/5 flex items-center justify-between rounded-md px-2"
              >
                <p>{item.name}</p>

                <Button
                  variant="ghostDestructive"
                  size="icon-sm"
                  disabled={!!deletingId}
                  onClick={() => handleRemove(item.id)}
                >
                  {deletingId === item.id ? <LoadingAnimation /> : <Trash />}
                </Button>
              </div>
            ))}
          </div>
        )}

        <Separator className="my-5" />

        <div className="flex justify-end">
          <CreatePopup>
            <Button size="icon-sm">
              <Plus />
            </Button>
          </CreatePopup>
        </div>
      </div>
    </section>
  );
}

const CreatePopup = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { mutateAsync, isPending } = useCreate();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add laundry item</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new laundry item to the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          autoFocus
          placeholder="jeans"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending || !name.trim()}
            onClick={async () => {
              await mutateAsync({ name: name.trim() });
              setName("");
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Submit request"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
