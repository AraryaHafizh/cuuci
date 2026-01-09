"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useStatus = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_attendance_status", token],
    queryFn: async () => {
      const res = await cuuciApi.get("/attendances/status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
