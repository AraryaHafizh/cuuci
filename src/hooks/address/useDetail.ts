"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useDetail = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  return useQuery({
    queryKey: ["address", id],
    queryFn: async () => {
      const res = await cuuciApi.get(`/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.data);
      return res.data.data;
    },
    enabled: !!id && !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
