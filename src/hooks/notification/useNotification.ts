"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useNotification = (enabled: boolean) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_notification", token],
    queryFn: async () => {
      const res = await cuuciApi.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
