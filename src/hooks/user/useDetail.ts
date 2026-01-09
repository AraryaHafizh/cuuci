"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useDetail = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_customer_order_detail", id],
    queryFn: async () => {
      const res = await cuuciApi.get(`/customers/order/${id}`, {
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

export const useDetailAdmin = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_admin_order_detail", id],
    queryFn: async () => {
      const res = await cuuciApi.get(`/admins/order/${id}`, {
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
