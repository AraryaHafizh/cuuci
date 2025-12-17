"use client";

import { MapSelect } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useCreate } from "@/hooks/outlet/useCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const createOutletSchema = z.object({
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
});

type OutletFormValues = z.infer<typeof createOutletSchema>;

export function OutletCreateInput() {
  const router = useRouter();
  const form = useForm<OutletFormValues>({
    resolver: zodResolver(createOutletSchema),
    defaultValues: {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
    },
  });

  const { mutateAsync: create, isPending } = useCreate();

  function onSubmit(data: OutletFormValues) {
    create(data);
  }

  return (
    <section className="mt-10 gap-5 space-y-5">
      <BasicInfo form={form} />
      <SelectLocation form={form} />

      <div className="flex justify-end gap-5">
        <Button variant={"outline"} onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)}>
          {isPending ? <LoadingAnimation /> : "Create Outlet"}
        </Button>
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
                <Input
                  {...field}
                  placeholder="123 Main Street, USA"
                  disabled={true}
                />
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
