"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useAcceptTask = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await cuuciApi.post(
        `/workers/jobs/take/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get_worker_tasks"],
        exact: false,
      });

      toast.success(data.message ?? "Pickup accepted");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
