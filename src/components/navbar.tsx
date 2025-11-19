"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const route = useRouter();
  const hiddenRoutes = ["/auth", "/dashboard"];

  if (hiddenRoutes.some((route) => pathname.startsWith(route))) return null;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-10 flex items-center justify-between rounded-4xl p-10 backdrop-blur-xl">
        <Link href="/" className="text-4xl font-black">
          cuuci
        </Link>
        <Button onClick={() => route.push("/auth/signin")}>Signin</Button>
      </div>
    </nav>
  );
};

export default Navbar;
