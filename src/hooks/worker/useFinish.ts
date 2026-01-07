"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AssignOrderItem } from "../order/useAssignTask";

export interface FinishPayload {
  orderItems: AssignOrderItem[];
}

export const useFinish = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      jobId,
      body,
    }: {
      jobId: string;
      body: FinishPayload;
    }) => {
      const { data } = await cuuciApi.post(
        `/workers/jobs/finish/${jobId}`,
        body,
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
