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
import { useEdit } from "@/hooks/outlet/useEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const editOutletSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

type OutletFormValues = z.infer<typeof editOutletSchema>;

export function OutletEditInput({ data }: { data: any }) {
  const router = useRouter();
  const form = useForm<OutletFormValues>({
    resolver: zodResolver(editOutletSchema),
    defaultValues: {
      name: data?.name,
      address: data?.address,
      latitude: data?.latitude,
      longitude: data?.longitude,
    },
  });

  const { mutateAsync: edit, isPending } = useEdit(data.id);

  function onSubmit(data: OutletFormValues) {
    edit(data);
  }

  return (
    <section className="mt-10 gap-5 space-y-5">
      <BasicInfo form={form} />
      <SelectLocation
        form={form}
        latitude={data?.latitude}
        longitude={data?.longitude}
      />

      <div className="flex justify-end gap-5">
        <Button variant={"outline"} onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)}>
          {isPending ? <LoadingAnimation /> : "Edit Outlet"}
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

function SelectLocation({
  form,
  latitude,
  longitude,
}: {
  form: UseFormReturn<OutletFormValues>;
  latitude: number;
  longitude: number;
}) {
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
            centerLat={latitude}
            centerLng={longitude}
            onSelect={handleSelect}
            isEdit={true}
          />
        </div>
      </CardContent>
    </Card>
  );
}
