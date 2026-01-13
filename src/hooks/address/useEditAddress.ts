"use client";

import { editAddressSchema } from "@/app/dashboard/account/[id]/EditAddress";
import { createAddressSchema } from "@/app/dashboard/account/CreateAddress";
import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import z from "zod";

export const useEditAddress = (id :string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: z.infer<typeof editAddressSchema>) => {
      const { data } = await cuuciApi.patch(`/addresses/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_address"] });
      queryClient.invalidateQueries({ queryKey: ["address", id] });
      toast.success(data.message || "Address updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Failed to update address");
    },
  });
};
