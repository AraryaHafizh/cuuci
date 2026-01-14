"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface userUpdateProps {
  name?: string;
  phoneNumber?: string;
  password?: string;
}

export const useEdit = () => {
  const { data: session, update } = useSession();
  const token = session?.user?.accessToken;
  const id = session?.user?.id;

  return useMutation({
    mutationFn: async ({ name, phoneNumber }: userUpdateProps) => {
      const { data } = await cuuciApi.patch(
        `/users/update/${id}`,
        { name, phoneNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    },

    onSuccess: async (data) => {
      await update({ reason: "profile-updated" });

      toast(data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};

export const useEditAdmin = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: userUpdateProps) => {
      const { data } = await cuuciApi.patch(`/users/update/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      queryClient.invalidateQueries({ queryKey: ["get_outlets"] });

      toast(data.message);

      router.back();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
