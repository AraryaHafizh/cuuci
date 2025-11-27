"use client";

import Link from "next/link";

const SuperAdminNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-10 flex items-center justify-between rounded-4xl px-10 py-7 backdrop-blur-xl">
        <Link href="/super-admin" className="text-4xl font-black">
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
