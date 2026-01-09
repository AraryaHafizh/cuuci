"use client";

import { OutletProps } from "@/app/super-admin/outlets/props";
import { SuparAdminConfirmation } from "@/components/popupConfirmation";
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
import { useAdminSignup } from "@/hooks/auth/useSignup";
import { useOutlets } from "@/hooks/outlet/useOutlet";
import { useUsers } from "@/hooks/user/useUser";
import { formatPhone } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
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
  const userData = data?.find((user: UserProps) => user.id === id);
  const isCustomer = userData?.role === "CUSTOMER";

  const router = useRouter();
  const form = useForm<OutletFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      password: "",
      phoneNumber: userData?.phoneNumber,
      role: userData?.role,
      outletId: userData?.outletId ?? "",
    },
  });

  const {
    mutateAsync: signup,
    isPending,
    openDialog,
    setOpenDialog,
  } = useAdminSignup();

  function onSubmit(data: any) {
    const filtered = Object.fromEntries(
      Object.entries(data).filter(
        ([_, v]) => v !== "" && v !== undefined && v !== null,
      ),
    );

    if (filtered.phoneNumber) {
      filtered.phoneNumber = "+62" + filtered.phoneNumber;
    }
  }

  return (
    <section>
      <div className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0">
        <BasicInfo form={form} />
        <UserRole form={form} isCustomer={isCustomer} />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant={"outline"} onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)}>
          {isPending ? <LoadingAnimation /> : "Create User"}
        </Button>
      </div>
      <SuparAdminConfirmation
        title="User Created"
        description="The new user has been added successfully."
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
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
                <Input {...field} />
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

function UserRole({
  form,
  isCustomer,
}: {
  form: UseFormReturn<OutletFormValues>;
  isCustomer: boolean;
}) {
  const { data } = useOutlets();

  const outlets = (data || []).map((outlet) => ({
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
                  disabled={isCustomer}
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
                  disabled={isCustomer}
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
