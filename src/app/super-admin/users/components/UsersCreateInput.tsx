"use client";

import { SuparAdminConfirmation } from "@/components/popup-confirmation";
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
import { useSignup } from "@/hooks/auth/useSignup";
import { formatPhoneDisplay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { outlets, roles } from "../data";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string(),
  phoneNumber: z.string().min(10),
  role: z.string().min(1, "Role is required"),
  outletId: z.string().min(1, "Outlet ID is required"),
});

type OutletFormValues = z.infer<typeof formSchema>;

export function UserCreateInput() {
  const route = useRouter();
  const form = useForm<OutletFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
      outletId: "",
    },
  });

  useEffect(() => {
    const name = form.getValues("name");
    const outlet = form.getValues("outletId");

    if (name && outlet) {
      const generated = `${name}-${outlet}`;
      form.setValue("password", generated, { shouldValidate: true });
    }
  }, [form.watch("name"), form.watch("outletId")]);

  const {
    mutateAsync: signup,
    isPending,
    openDialog,
    setOpenDialog,
  } = useSignup();

  function onSubmit(data: OutletFormValues) {
    signup(data);
  }

  return (
    <section>
      <div className="mt-10 flex gap-5">
        <BasicInfo form={form} />
        <UserRole form={form} />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant={"outline"} onClick={() => route.back()}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)}>
          {isPending ? <LoadingAnimation /> : "Create User"}
        </Button>
      </div>
      <SuparAdminConfirmation
        title="User Created"
        description="lorem ipsum"
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
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm opacity-60">
                    +62
                  </span>
                  <Input
                    {...field}
                    placeholder="812 1234 5678"
                    className="pl-10"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formatPhoneDisplay(field.value ?? "")}
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
                <FieldLabel>Generated Password</FieldLabel>
                <Input {...field} disabled={true} />
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
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
