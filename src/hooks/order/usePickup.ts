"use client";

import { PickupProps } from "@/app/dashboard/orders/create/page";
import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const usePickup = () => {
  const { data: session, update } = useSession();
  const token = session?.user?.accessToken;

  return useMutation({
    mutationFn: async (body: PickupProps) => {
      const { data } = await cuuciApi.post(`/orders/create`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },

    onSuccess: async (data) => {
      await update({ reason: "profile-updated" });
      console.log("update");

      toast(data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
