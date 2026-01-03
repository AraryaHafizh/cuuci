"use client";

import { MapSelect } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { Separator } from "@/components/ui/separator";
import { useCreate } from "@/hooks/address/useCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export const createAddressSchema = z.object({
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
  isPrimary: z.boolean(),
});

type AddressFormValues = z.infer<typeof createAddressSchema>;

export default function CreateAddress({
  setCreate,
}: {
  setCreate: (value: boolean) => void;
}) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      address: "",
      latitude: "",
      longitude: "",
      isPrimary: false,
    },
  });

  const handleSelect = (lat: number, lng: number, address: string) => {
    form.setValue("address", address);
    form.setValue("latitude", String(lat));
    form.setValue("longitude", String(lng));
  };

  const { mutateAsync: create, isPending } = useCreate(() => {
    setCreate(false);
  });

  function onSubmit(data: AddressFormValues) {
    create(data);
  }

  return (
    <div className="rounded-2xl border bg-(--container-bg) p-5">
      <div className="items-center justify-between md:flex">
        <div>
          <p>Create New Address</p>
          <p className="text-sm font-light opacity-50">
            Create new address for faster checkout and delivery.
          </p>
        </div>
        <Button size={"icon-sm"} onClick={() => setCreate(false)}>
          <X />
        </Button>
      </div>
      <Separator className="my-5" />
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
        <div className="flex items-center justify-end gap-5">
          <Controller
            name="isPrimary"
            control={form.control}
            render={({ field }) => (
              <Label className="hover:bg-primary/30 flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-all">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-foreground"
                />
                <p className="text-sm font-light">Set as default</p>
              </Label>
            )}
          />

          <Button onClick={form.handleSubmit(onSubmit)}>
            {isPending ? <LoadingAnimation /> : "Create Outlet"}
          </Button>
        </div>
      </div>
    </div>
  );
}
