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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useOutlets } from "@/hooks/outlet/useOutlet";
import { useEditAdmin } from "@/hooks/user/useEdit";
import { useUsers } from "@/hooks/user/useUser";
import { formatPhone } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { roles } from "../../data";
import { UserProps } from "../../props";

export const editUserSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  password: z.string().optional(),
  phoneNumber: z.string().optional(),
  role: z.string().optional(),
  outletId: z.string().optional(),
});

type OutletFormValues = z.infer<typeof editUserSchema>;

export function UserEditInput({ id }: { id: string }) {
  const { data } = useUsers();
  const users = Array.isArray(data?.data) ? data.data : [];
  const userData = users.find((user: any) => user.id === id);

  const router = useRouter();
  const form = useForm<OutletFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
      outletId: "",
    },
  });

  const { mutateAsync: edit, isPending } = useEditAdmin(id);

  useEffect(() => {
    if (!userData) return;

    form.reset({
      name: userData.name ?? "",
      email: userData.email ?? "",
      password: "",
      phoneNumber: userData.phoneNumber?.replace("+62", "") ?? "",
      role: userData.role ?? "",
      outletId: userData.outletId ?? "",
    });
  }, [userData]);

  async function onSubmit() {
    const values = form.getValues();
    const payload: Partial<OutletFormValues> = {};

    // NAME
    if (values.name?.trim() && values.name.trim() !== userData?.name) {
      payload.name = values.name.trim();
    }

    // PASSWORD (selalu boleh kalau diisi)
    if (values.password?.trim()) {
      payload.password = values.password;
    }

    // PHONE NUMBER
    if (values.phoneNumber?.trim()) {
      const cleaned = values.phoneNumber.replace(/\s+/g, "");
      const formatted = `+62${cleaned.replace(/^62/, "")}`;

      if (formatted !== userData?.phoneNumber) {
        payload.phoneNumber = formatted;
      }
    }

    if (Object.keys(payload).length === 0) {
      toast("No changes detected");
      return;
    }

    await edit(payload);
  }

  return (
    <section>
      <div className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0">
        <BasicInfo form={form} />
        <UserRole form={form} />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant={"outline"} onClick={() => router.back()}>
          Cancel
        </Button>
        <EditConfirmation onSubmit={onSubmit} isPending={isPending}>
          <Button>Edit User</Button>
        </EditConfirmation>
      </div>
    </section>
  );
}

function BasicInfo({ form }: { form: UseFormReturn<OutletFormValues> }) {
  return (
    <Card className="flex-2">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>

      <CardContent className="mt-5">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Full Name</FieldLabel>
                <Input {...field} placeholder="Jojn Doe" autoComplete="off" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>User Email</FieldLabel>
                <Input
                  {...field}
                  placeholder="user@mail.co"
                  autoComplete="off"
                  disabled={true}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Phone Number</FieldLabel>
                <div className="relative flex-2">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs opacity-60 md:text-sm">
                    +62
                  </span>
                  <Input
                    {...field}
                    placeholder="812 1234 5678"
                    className="pl-10"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formatPhone(field.value ?? "")}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      field.onChange(raw);
                    }}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>
                <Input {...field} placeholder="*****" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

function UserRole({ form }: { form: UseFormReturn<OutletFormValues> }) {
  const { data } = useOutlets();

  const outlets = (data?.data ?? []).map((outlet: any) => ({
    value: outlet.id,
    label: outlet.name,
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>User Role</CardTitle>
      </CardHeader>

      <CardContent className="mt-5">
        <FieldGroup>
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Assign Role</FieldLabel>
                <Combobox
                  options={roles}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Role"
                  disabled={true}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="outletId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Assign to Outlet</FieldLabel>
                <Combobox
                  options={outlets}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Store"
                  disabled={true}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

const EditConfirmation = ({
  onSubmit,
  isPending,
  children,
}: {
  onSubmit: () => Promise<void>;
  isPending: boolean;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit user detail?</AlertDialogTitle>
          <AlertDialogDescription>
            Make sure the updated information is correct before saving the
            changes.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={async () => {
              await onSubmit();
              setOpen(false);
            }}
          >
            {isPending ? <LoadingAnimation /> : "Save changes"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
