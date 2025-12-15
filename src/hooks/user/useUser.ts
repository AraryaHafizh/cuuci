"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useSuperAdminUsers = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["super-admin-users", token],
    queryFn: async () => {
      const res = await cuuciApi.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30, // fresh selama 30 menit
    refetchOnWindowFocus: false, // refetch saat tab fokus
    refetchOnMount: false, // refetch saat komponen mount
    refetchOnReconnect: true, // refetch saat reconnect
  });
};

export const useAdminUsers = ({ params }: { params?: any } = {}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["admin-users", token, params],
    queryFn: async () => {
      const res = await cuuciApi.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};
