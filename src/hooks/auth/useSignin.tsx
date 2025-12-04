import { signinSchema } from "@/app/(auth)/signin/Form";
import { cuuciApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: z.infer<typeof signinSchema>) => {
      const { data } = await cuuciApi.post("/auth/login", body);
      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, redirect: false });

      switch (data.role) {
        case "CUSTOMER":
          router.replace("/dashboard");
          break;
        case "WORKER":
          router.replace("/worker");
          break;
        case "DRIVER":
          router.replace("/driver");
          break;
        case "OUTLET_ADMIN":
          router.replace("/admin");
          break;
        case "SUPER_ADMIN":
          router.replace("/super-admin");
          break;
        default:
          router.replace("/");
          break;
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Oops, something went wrong");
    },
  });
};
