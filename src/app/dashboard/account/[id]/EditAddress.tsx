"use client";

import { MapSelect } from "@/components/Map";
import { Button } from "@/components/ui/button";
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
import { useDetail } from "@/hooks/address/useDetail";
import { useEditAddress } from "@/hooks/address/useEditAddress";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export const editAddressSchema = z.object({
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

type AddressFormValues = z.infer<typeof editAddressSchema>;

interface EditAddressProps {
  id: string;
}

export default function EditAddress({ id }: EditAddressProps) {
  const router = useRouter();
  const { data: address, isLoading: isLoadingAddress } = useDetail(id);
  const { mutateAsync: editAddress, isPending } = useEditAddress(id);
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: {
      address: "",
      latitude: "",
      longitude: "",
    },
  });

  const handleSelect = (lat: number, lng: number, address: string) => {
    form.setValue("address", address);
    form.setValue("latitude", String(lat));
    form.setValue("longitude", String(lng));
  };


  useEffect(() => {
    if (!address) return;

    form.reset({
      address: address.address ?? "",
      latitude: String(address.latitude) ?? "",
      longitude: String(address.longitude) ?? "",
    });
  }, [address, form]);

  const onSubmit = async (data: AddressFormValues) => {
    try {
      await editAddress(data);
      router.push("/dashboard/account"); // Redirect back to account page
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/account");
  };

  if (isLoadingAddress) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (!address) {
    return (
      <div className="rounded-2xl border bg-(--container-bg) p-5">
        <p>Address not found</p>
        <Button onClick={handleCancel} className="mt-5">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-(--container-bg) p-5">
      <div className="items-center justify-between md:flex">
        <div>
          <p>Edit Address</p>
          <p className="text-sm font-light opacity-50">
            Update your delivery address information.
          </p>
        </div>
        <Button size="icon-sm" onClick={handleCancel}>
          <X />
        </Button>
      </div>

      <Separator className="my-5" />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  disabled
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="space-y-5 overflow-hidden rounded-lg">
          <Label>Select Location</Label>
          <MapSelect
            centerLat={-6.2}
            centerLng={106.8}
            onSelect={handleSelect}
          />
        </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <LoadingAnimation /> : "Save Changes"}
            </Button>
          </div>
        
      </form>
    </div>
  );
}
