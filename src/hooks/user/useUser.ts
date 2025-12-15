"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useUsers = ({ params }: { params?: any } = {}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get-users", token],
    queryFn: async () => {
      const res = await cuuciApi.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      console.log(res.data.data);

      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30, // fresh selama 30 menit
    refetchOnWindowFocus: false, // refetch saat tab fokus
  });
};
