import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useVerifyAccount = (token: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { data } = await cuuciApi.patch(
        "/auth/email-verification",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    },
    onSuccess: async () => {
      router.replace("/signin");
    },
    onError: () => {
      toast.error("Oops, something went wrong");
    },
  });
};
