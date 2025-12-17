"use client";

import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useVerifyAccount } from "@/hooks/auth/useVerifyAccount";

export function VerifyButton({ token }: { token: string }) {
  const { mutate, isPending } = useVerifyAccount(token);

  return (
    <Button onClick={() => mutate()} className="w-full">
      {isPending ? <LoadingAnimation /> : "Verify Account"}
    </Button>
  );
}
