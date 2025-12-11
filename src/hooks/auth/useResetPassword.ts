import { resetPasswordSchema } from "@/app/(auth)/reset-password/[token]/Form";
import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

export const useResetPassword = (token: string) => {
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (body: z.infer<typeof resetPasswordSchema>) => {
      const { data } = await cuuciApi.patch("/auth/reset-password", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: async () => {
      setOpenDialog(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Oops, something went wrong");
    },
  });

  return { ...mutation, openDialog, setOpenDialog };
};
