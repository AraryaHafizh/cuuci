"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useUpdateProfilePicture = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const queryClient = useQueryClient();
  const { update } = useSession();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await cuuciApi.patch(`/users/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: async (response) => {
      await update({
        profilePictureUrl: response.data?.profilePictureUrl, // Adjust based on your response
      });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to upload");
    },
  });
};
