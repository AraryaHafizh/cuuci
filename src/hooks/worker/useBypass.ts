"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BypassPayload {
  jobId: string;
  note: string;
}

export const useBypass = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ jobId, note }: BypassPayload) => {
      const { data } = await cuuciApi.post(
        `/workers/jobs/bypass/${jobId}`,
        { note },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    },

    onSuccess: async (data) => {
      router.back();
      queryClient.invalidateQueries({
        queryKey: ["get_worker_tasks"],
        exact: false,
      });

      toast.success(data.message ?? "Request bypass success");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
