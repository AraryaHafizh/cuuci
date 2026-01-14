"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cuuciApi } from "@/lib/axios";
import { toast } from "sonner";
import { LoadingScreen } from "@/components/ui/loading-animation";

export default function VerifyEmailUpdatePage({ 
  params 
}: { 
  params: Promise<{ token: string }> 
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    params.then(({ token }) => setToken(token));
  }, [params]);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        await cuuciApi.get(`/auth/verify-email-update/${token}`);
        setStatus("success");
        toast.success("Email updated successfully!");
        
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } catch (error: any) {
        setStatus("error");
        toast.error(error.response?.data?.message || "Verification failed");
      }
    };

    verifyEmail();
  }, [token, router]);

  if (status === "loading") return <LoadingScreen />;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        {status === "success" ? (
          <>
            <h1 className="text-2xl font-bold text-green-600">Email Verified!</h1>
            <p className="mt-2">Redirecting to login...</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
            <p className="mt-2">Please try again or contact support.</p>
          </>
        )}
      </div>
    </div>
  );
}