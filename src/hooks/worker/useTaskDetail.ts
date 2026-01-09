"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useTaskDetail = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_task_detail", token],
    queryFn: async () => {
      const res = await cuuciApi.get(`/workers/jobs/${id}`, {
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
