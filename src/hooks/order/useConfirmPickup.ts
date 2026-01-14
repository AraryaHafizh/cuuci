"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useConfirmPickup = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const { data } = await cuuciApi.post(
        `/drivers/requests/confirm/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    },

    onSuccess: (data) => {
      router.back();
      queryClient.invalidateQueries({
        queryKey: ["get_ongoing"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["get_available_pickup"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["get_driver_history"],
        exact: false,
      });
      
      toast.success(data.message ?? "Pickup confirmed");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
