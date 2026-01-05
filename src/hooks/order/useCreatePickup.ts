"use client";

import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface CreatePickupDTO {
  addressId: string;
  pickupAt: string;
  outletId: string;
  note?: string;
}

export const useCreatePickup = () => {
  return useMutation({
    mutationFn: async (data: CreatePickupDTO) => {
      const res = await cuuciApi.post("/orders/create", data);
      return res.data;
    },
  });
};