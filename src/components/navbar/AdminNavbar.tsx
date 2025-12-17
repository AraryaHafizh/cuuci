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
import { NotificationBadge, NotificationItem } from "../NotificationBandge";
import { SignoutConfirmation } from "../popupConfirmation";

const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto">
      <div className="text-primary bg-background/15 m-5 flex items-center justify-between rounded-2xl px-5 py-3 backdrop-blur-xl md:m-10 md:rounded-4xl md:px-10 md:py-7">
        <Link href="/admin" className="text-2xl font-black md:text-4xl">
          cuuci
        </Link>

        <section className="flex flex-row-reverse items-center gap-5 md:flex-row">
          <div>
            <DesktopNav />
            <MobileNav />
          </div>
          <NotificationBadge notifications={data} />
          <SignoutPopup />
        </section>
      </div>
    </nav>
  );
};

export default AdminNavbar;

const DesktopNav = () => {
  return (
    <section className="hidden items-center space-x-5 md:flex">
      <Link href={"/admin/new"}>New Orders</Link>
      <Link href={"/admin/orders"}>Orders</Link>
      <Link href={"/admin/workers"}>Workers</Link>
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
            <Link href="/admin/new">New Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/orders">Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/workers">Workers</Link>
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

const data: NotificationItem[] = [
  {
    id: "1",
    title: "Your call has been confirmed",
    time: "5 minutes ago",
    icon: "calendar",
  },
  {
    id: "2",
    title: "You have a new message",
    time: "1 minute ago",
    icon: "inbox",
  },
  {
    id: "3",
    title: "Your subscription is expiring soon",
    time: "2 hours ago",
    icon: "calendar-check",
  },
];
