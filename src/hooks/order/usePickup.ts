"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type PickupProps = {
  addressId: string;
  outletId: string;
  notes: string | null;
  pickupTime: Date;
};

export const usePickup = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useMutation({
    mutationFn: async (body: PickupProps) => {
      const { data } = await cuuciApi.post("/orders/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },

    onSuccess: async (data) => {
      router.back();
      toast.success(data.message ?? "Pickup request created");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
