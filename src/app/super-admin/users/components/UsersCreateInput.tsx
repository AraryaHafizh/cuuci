"use client";

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
import { formatPhone, generatePassword } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { roles, shifts } from "../data";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  phoneNumber: z.string().min(10),
  role: z.string().min(1, "Role is required"),
  outletId: z.string().min(1, "Outlet ID is required"),
  shift: z.string(),
});

type OutletFormValues = z.infer<typeof createUserSchema>;

export function UserCreateInput() {
  const router = useRouter();
  const form = useForm<OutletFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
      outletId: "",
      shift: "",
    },
  });

  const {
    mutateAsync: signup,
    isPending,
    openDialog,
    setOpenDialog,
  } = useAdminSignup();

  function onSubmit(data: OutletFormValues) {
    const { role, shift, ...rest } = data;

    const payload: any = {
      ...rest,
      role,
      phoneNumber: "+62" + data.phoneNumber,
    };

    if (role === "WORKER") {
      payload.shift = shift;
    }

    signup(payload);
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
                <div className="flex gap-2">
                  <Input {...field} />
                  <Button
                    variant={"secondary"}
                    onClick={() =>
                      form.setValue("password", generatePassword(), {
                        shouldValidate: true,
                      })
                    }
                  >
                    generate
                  </Button>
                </div>
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
  const role = form.watch("role");

  const outlets = (data || []).map((outlet: any) => ({
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
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {role === "WORKER" && (
            <Controller
              name="shift"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Assign Shift</FieldLabel>
                  <Combobox
                    options={shifts}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Shift"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
