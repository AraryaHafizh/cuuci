"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useUsers = ({ params }: { params?: any } = {}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get-users", token, params],

    queryFn: async () => {
      const res = await cuuciApi.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};

export const useUser = (userId: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get-user", userId, token],
    queryFn: async () => {
      const res = await cuuciApi.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
