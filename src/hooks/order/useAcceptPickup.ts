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

export const useAcceptPickup = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await cuuciApi.post(
        `/drivers/requests/take/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    },

    onSuccess: async (data) => {
      router.back();
      toast.success(data.message ?? "Pickup accepted");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
