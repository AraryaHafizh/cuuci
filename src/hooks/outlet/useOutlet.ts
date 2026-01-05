"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type Outlet = {
  id: string;
  name: string;
  label: string;
  address: string;
  latitude: string;
  longitude: string;
};

export const useOutlets = ({ params }: { params?: any } = {}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery<Outlet[]>({
    queryKey: ["outlets", token, params],
    queryFn: async () => {
      const res = await cuuciApi.get("/outlets", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};

export const useOutlet = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["get_outlet", token, id],
    queryFn: async () => {
      const res = await cuuciApi.get(`/outlets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
