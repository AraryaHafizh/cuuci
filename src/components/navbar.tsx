"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const hiddenRoutes = ["/auth", "/dashboard"];

  if (hiddenRoutes.some((route) => pathname.startsWith(route))) return null;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="border-background text-primary m-10 flex items-center justify-between rounded-2xl px-5 py-10 backdrop-blur-xl">
        <Link href="/" className="text-4xl font-black">
          cuuci
        </Link>
        <Button>Signin</Button>
      </div>
    </nav>
  );
};

export default Navbar;
