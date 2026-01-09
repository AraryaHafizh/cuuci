"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useCheckIn = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await cuuciApi.post(
        "/attendances/check-in",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get_attendance_status"],
        exact: false,
      });

      toast.success(data.message ?? "Check in successful");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
