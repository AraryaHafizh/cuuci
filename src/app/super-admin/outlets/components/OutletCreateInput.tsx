"use client";

import { MapSelect } from "@/components/Map";
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
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z
    .string()
    .min(1, "Latitude is required")
    .refine(
      (val) => !isNaN(parseFloat(val)),
      "Latitude must be a valid number",
    ),
  longitude: z
    .string()
    .min(1, "Longitude is required")
    .refine(
      (val) => !isNaN(parseFloat(val)),
      "Longitude must be a valid number",
    ),
  admin: z.string(),
  workerIds: z.array(z.string()),
  driverIds: z.array(z.string()),
});

type OutletFormValues = z.infer<typeof formSchema>;

export function OutletCreateInput() {
  const route = useRouter();
  const form = useForm<OutletFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      admin: "",
      workerIds: [],
      driverIds: [],
    },
  });

  function onSubmit(data: OutletFormValues) {
    console.log(data);
  }

  return (
    <section className="mt-10 flex gap-5">
      <div className="flex-2 space-y-5">
        <BasicInfo form={form} />
        <SelectLocation form={form} />
      </div>
      <div className="flex-1">
        <OutletOperational form={form} />
        <div className="mt-10 flex justify-end gap-2">
          <Button variant={"outline"} onClick={() => route.back()}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Create Outlet</Button>
        </div>
      </div>
    </section>
  );
}

function BasicInfo({ form }: { form: UseFormReturn<OutletFormValues> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>

      <CardContent className="mt-5">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Outlet Name</FieldLabel>
                <Input
                  {...field}
                  placeholder="e.g. Laundry Express"
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

function SelectLocation({ form }: { form: UseFormReturn<OutletFormValues> }) {
  const handleSelect = (lat: number, lng: number, address: string) => {
    form.setValue("address", address);
    form.setValue("latitude", String(lat));
    form.setValue("longitude", String(lng));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Details</CardTitle>
      </CardHeader>

      <CardContent className="mt-5">
        <FieldGroup>
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Full Address</FieldLabel>
                <Input {...field} placeholder="123 Main Street, USA" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="mt-5 space-y-5 overflow-hidden rounded-lg">
          <Label>Select Location</Label>
          <MapSelect
            centerLat={-6.2} // default coordinate (change later)
            centerLng={106.8}
            onSelect={handleSelect}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function OutletOperational({
  form,
}: {
  form: UseFormReturn<OutletFormValues>;
}) {
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
    <Card>
      <CardHeader>
        <CardTitle>Operational Details</CardTitle>
      </CardHeader>

      <CardContent className="mt-5">
        <FieldGroup>
          <Controller
            name="admin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Assign Admin</FieldLabel>
                <Combobox
                  options={workers}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select User"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="workerIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Assign Workers</FieldLabel>
                <MultiSelect
                  options={workers}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select Workers"
                  hideSelectAll={true}
                  maxCount={999}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="driverIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Assign Drivers</FieldLabel>
                <MultiSelect
                  options={workers}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select Drivers"
                  hideSelectAll={true}
                  maxCount={999}
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
