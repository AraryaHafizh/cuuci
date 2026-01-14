"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useSelf = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_customer_order_detail", id],
    queryFn: async () => {
      const res = await cuuciApi.get("/admins/self", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    enabled: !!token,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export const useSelfDriver = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_driver_info", id],
    queryFn: async () => {
      const res = await cuuciApi.get("/drivers/self", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    enabled: !!token,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};
