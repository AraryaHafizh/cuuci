"use client";

import Link from "next/link";
import { SignoutConfirmation } from "../popupConfirmation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-10 flex items-center justify-between rounded-4xl px-10 py-7 backdrop-blur-xl">
        <Link href="/admin" className="text-4xl font-black">
          cuuci
        </Link>
        <section className="flex items-center space-x-5">
          <Link href={"/admin/new"}>New Orders</Link>
          <Link href={"/admin/orders"}>Orders</Link>
          <Link href={"/admin/workers"}>Workers</Link>
          <SignoutConfirmation>
            <Button
              size={"sm"}
              variant={"destructive"}
              className="flex justify-start gap-1"
            >
              <LogOut />
              Sign out
            </Button>
          </SignoutConfirmation>
        </section>
      </div>
    </nav>
  );
};

export default AdminNavbar;
