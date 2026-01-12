"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const useEditPassword = () => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordData) => {
      const res = await cuuciApi.patch("/users/update-password", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    },
    onSuccess: async () => {
      toast("Update password success")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Oops, something went wrong");
    },
  });
};