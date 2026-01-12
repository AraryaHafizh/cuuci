"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useOrderOverview = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_order_overview", token],
    queryFn: async () => {
      const res = await cuuciApi.get("/summaries/order-overview", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.data);

      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
