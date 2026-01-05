"use client";

import { createOutletSchema } from "@/app/super-admin/outlets/components/OutletCreateInput";
import { editOutletSchema } from "@/app/super-admin/outlets/edit/[id]/OutletEditInput";
import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export const useEdit = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: z.infer<typeof editOutletSchema>) => {
      const { data } = await cuuciApi.patch(`/outlets/edit/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_outlets"] });
      toast(data.message);

      router.back();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
