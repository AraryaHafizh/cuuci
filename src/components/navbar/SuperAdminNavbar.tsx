"use client";

import Link from "next/link";

const SuperAdminNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-5 flex items-center justify-between rounded-2xl px-5 py-3 backdrop-blur-xl md:m-10 md:rounded-4xl md:px-10 md:py-7">
        <Link href="/super-admin" className="text-xl font-black md:text-4xl">
          cuuci
        </Link>
        <section className="space-x-5">
          <Link href={"/super-admin/outlets"}>Outlets</Link>
          <Link href={"/super-admin/users"}>Users</Link>
          <Link href={"/super-admin/orders"}>Orders</Link>
        </section>
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
