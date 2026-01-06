"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface AssignOrderItem {
  id: string;
  qty: number;
}

export interface AssignOrderBody {
  orderItems: AssignOrderItem[];
  totalPrice: number;
  totalWeight: number;
}

export interface AssignTaskParams {
  orderId: string;
  body: AssignOrderBody;
}

export const useAssignTask = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, body }: AssignTaskParams) => {
      const { data } = await cuuciApi.post(
        `/admins/orders/${orderId}/assign`,
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
        queryKey: ["get_arrived_order"],
        exact: false,
      });

      toast.success(data.message ?? "Pickup accepted");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
