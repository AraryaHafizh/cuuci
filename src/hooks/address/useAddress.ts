"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type Address = {
  id: string;
  label: string;
  address: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
};

export const useAddress = ({ index }: { index?: number } = {}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery<Address[]>({
    queryKey: ["addresses", token],
    queryFn: async () => {
      const res = await cuuciApi.get("/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: index === undefined || index === 2,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
