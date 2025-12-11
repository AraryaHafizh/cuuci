import { forgotPasswordSchema } from "@/app/(auth)/forgot-password/Form";
import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import z from "zod";

export const useForgotPassword = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (body: z.infer<typeof forgotPasswordSchema>) => {
      const { data } = await cuuciApi.post("/auth/forgot-password", body);
      return data;
    },
    onSuccess: async () => {
      setOpenDialog(true);
    },
    onError: () => {
      setOpenDialog(true);
    },
  });

  return { ...mutation, openDialog, setOpenDialog };
};
