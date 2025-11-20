"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Navbar = () => {
  const route = useRouter();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-10 flex items-center justify-between rounded-4xl px-10 py-7 backdrop-blur-xl">
        <Link href="/" className="text-4xl font-black">
          cuuci
        </Link>
        <Button onClick={() => route.push("/signin")}>Signin</Button>
      </div>
    </nav>
  );
};

export default Navbar;
