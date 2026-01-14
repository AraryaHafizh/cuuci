"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useCompleted = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_driver_completed", token],
    queryFn: async () => {
      const res = await cuuciApi.get("/drivers/completed", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
