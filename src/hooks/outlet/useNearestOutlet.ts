"use client";

import { cuuciApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useNearestOutlet = (addressId: string) => {
  return useQuery({
    queryKey: ["nearest-outlet", addressId],
    queryFn: async () => {
      const res = await cuuciApi.get(`/outlets/nearest?addressId=${addressId}`);
      return res.data.data;
    },
    enabled: !!addressId, // Only fetch when address is selected
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });
};