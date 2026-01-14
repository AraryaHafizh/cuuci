import { signupSchema } from "@/app/(auth)/signup/Form";
import { createUserSchema } from "@/app/super-admin/users/components/UsersCreateInput";
import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

export const useSignup = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (body: z.infer<typeof signupSchema>) => {
      const { data } = await cuuciApi.post("/auth/register", body);
      return data;
    },
    onSuccess: async () => {
      setOpenDialog(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { ...mutation, openDialog, setOpenDialog };
};

export const useAdminSignup = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: z.infer<typeof createUserSchema>) => {
      const { data } = await cuuciApi.post("/auth/register", body);
      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["get_outlets"] });
      queryClient.invalidateQueries({ queryKey: ["get_metrics"] });

      setOpenDialog(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { ...mutation, openDialog, setOpenDialog };
};
