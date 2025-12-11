"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const LandingNavbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-5 flex items-center justify-between rounded-2xl px-5 py-3 backdrop-blur-xl md:m-10 md:rounded-4xl md:px-10 md:py-7">
        <Link href="/" className="text-xl font-black md:text-4xl">
          cuuci
        </Link>
        <Button
          onClick={() => router.push("/signin")}
          className="h-7 gap-1.5 rounded-md px-3 py-2 has-[>svg]:px-2.5 md:h-9 md:px-4 md:has-[>svg]:px-3"
        >
          Signin
        </Button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
