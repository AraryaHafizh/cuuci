"use client";

import { createAddressSchema } from "@/app/dashboard/account/CreateAddress";
import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import z from "zod";

export const useCreate = (onSuccessCallback?: () => void) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: z.infer<typeof createAddressSchema>) => {
      const { data } = await cuuciApi.post("/addresses/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_address"] });
      onSuccessCallback?.();
      toast(data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
