"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useOutlets = ({ params }: { params?: any } = {}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_outlets", token, params],
    queryFn: async () => {
      const res = await cuuciApi.get("/outlets", {
        headers: {Authorization: `Bearer ${token}`},
        params,
      });
      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
