"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { NotificationBadge } from "../NotificationBandge";
import { SignoutConfirmation } from "../popupConfirmation";

const SuperAdminNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-5 flex items-center justify-between rounded-2xl px-5 py-3 backdrop-blur-xl md:m-10 md:rounded-4xl md:px-10 md:py-7">
        <Link href="/super-admin" className="text-2xl font-black md:text-4xl">
          cuuci
        </Link>

        <section className="flex flex-row-reverse items-center gap-5 md:flex-row">
          <div>
            <DesktopNav />
            <MobileNav />
          </div>
          <NotificationBadge />
          <SignoutPopup />
        </section>
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;

const DesktopNav = () => {
  return (
    <section className="hidden items-center space-x-5 md:flex">
      <Link href={"/super-admin/outlets"}>Outlets</Link>
      <Link href={"/super-admin/users"}>Users</Link>
      <Link href={"/super-admin/orders"}>Orders</Link>
    </section>
  );
};

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
          <DropdownMenuItem asChild>
            <Link href="/super-admin/outlets">Outlets</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/super-admin/users">Users</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/super-admin/orders">Orders</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <SignoutConfirmation>
              <Button
                variant="destructive"
                className="flex w-full justify-center gap-3"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </SignoutConfirmation>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const SignoutPopup = () => {
  return (
    <div className="hidden md:block">
      <SignoutConfirmation>
        <Button
          variant="destructive"
          className="flex w-fit justify-center gap-3"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </SignoutConfirmation>
    </div>
  );
};
