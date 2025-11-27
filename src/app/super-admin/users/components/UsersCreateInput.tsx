"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
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
      phoneNumber: "",
      role: "",
      outletId: "",
    },
  });

  function onSubmit(data: OutletFormValues) {
    toast("tes");
    console.log(data);
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
        <Button onClick={form.handleSubmit(onSubmit)}>Create User</Button>
      </div>
    </section>
  );
}

function BasicInfo({ form }: { form: UseFormReturn<OutletFormValues> }) {
  return (
    <Card className="flex-2">
      <CardHeader>
        <CardTitle>User Role</CardTitle>
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
                <Input
                  {...field}
                  placeholder="+62 812 1234 5678"
                  autoComplete="off"
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

function UserRole({ form }: { form: UseFormReturn<OutletFormValues> }) {
  const workers = [
    { value: "w1", label: "Avaluezen Brooks" },
    { value: "w2", label: "Liam Carter" },
    { value: "w3", label: "Noah Bennett" },
    { value: "w4", label: "Ethan Shaw" },
    { value: "w5", label: "Mason Turner" },
    { value: "w6", label: "Lucas Reed" },
    { value: "w7", label: "James Coleman" },
    { value: "w8", label: "Henry Ford" },
    { value: "w9", label: "Alexander Hayes" },
    { value: "w10", label: "Samuel Price" },
    { value: "w11", label: "Daniel Foster" },
    { value: "w12", label: "Matthew Grant" },
    { value: "w13", label: "Joseph Sanders" },
    { value: "w14", label: "Davvaluez Chambers" },
    { value: "w15", label: "Andrew Lane" },
    { value: "w16", label: "Benjamin Harper" },
    { value: "w17", label: "Elijah Scott" },
    { value: "w18", label: "Logan Reynolds" },
    { value: "w19", label: "Oliver Pierce" },
    { value: "w20", label: "Caleb Dixon" },
    { value: "w21", label: "Gabriel Andrews" },
    { value: "w22", label: "Nathan Bishop" },
    { value: "w23", label: "Isaac Harmon" },
    { value: "w24", label: "Julian Barrett" },
    { value: "w25", label: "Christopher Hale" },
    { value: "w26", label: "Joshua Malone" },
    { value: "w27", label: "Wyatt Norton" },
    { value: "w28", label: "Evan Walsh" },
    { value: "w29", label: "Owen Barrett" },
    { value: "w30", label: "Dominic Pierce" },
    { value: "w31", label: "Asher Logan" },
    { value: "w32", label: "Leo Warner" },
    { value: "w33", label: "Hudson Blake" },
    { value: "w34", label: "Dylan Rhodes" },
    { value: "w35", label: "Adam Brooks" },
    { value: "w36", label: "Charles Monroe" },
    { value: "w37", label: "Sebastian Tate" },
    { value: "w38", label: "Riley Jennings" },
    { value: "w39", label: "Miles Carter" },
    { value: "w40", label: "Rowan Ellis" },
    { value: "w41", label: "Tyler Maxwell" },
    { value: "w42", label: "Zachary Holt" },
    { value: "w43", label: "Theo Mitchell" },
    { value: "w44", label: "Ian Barrett" },
    { value: "w45", label: "Weston Clarke" },
    { value: "w46", label: "Grayson Flynn" },
    { value: "w47", label: "Nolan Shepard" },
    { value: "w48", label: "Brayden Keller" },
    { value: "w49", label: "Jasper Reeves" },
    { value: "w50", label: "Cole Matthews" },
  ];
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
                  options={workers}
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
                  options={workers}
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
