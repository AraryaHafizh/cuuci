"use client";

import { createOutletSchema } from "@/app/super-admin/outlets/components/OutletCreateInput";
import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export const useCreate = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: z.infer<typeof createOutletSchema>) => {
      const { data } = await cuuciApi.post("/outlets/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_outlets"] });
      queryClient.invalidateQueries({ queryKey: ["get_metrics"] });
      queryClient.invalidateQueries({ queryKey: ["get_outlet_overview"] });
      toast(data.message);

      router.back();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
