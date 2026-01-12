"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const useEditPassword = () => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordData) => {
        console.log('Sending to backend:', data); // Add this
        const payload = { password: data.newPassword };
      const res = await cuuciApi.patch("/users/update-password", payload, {
        headers: {
          'Content-Type': 'application/json', // Ensure JSON
        },
      });
      return res.data;
    },
  });
};