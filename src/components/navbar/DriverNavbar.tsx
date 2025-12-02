"use client";

import Link from "next/link";

const DriverNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-10 flex items-center justify-between rounded-4xl px-10 py-7 backdrop-blur-xl">
        <Link href="/driver" className="text-4xl font-black">
          cuuci
        </Link>
        <section className="space-x-5">
          <Link href={"/driver/deliveries"}>My Deliveries</Link>
          <Link href={"/driver/account"}>Account</Link>
        </section>
      </div>
    </nav>
  );
};

export default DriverNavbar;
