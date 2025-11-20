"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { menuItems } from "./data";
import { AccountMenuDetail } from "./MenuDetail";
import { ProfileStore } from "./store";

export default function Account() {
  return (
    <main className="pt-50">
      <Greeting />
      <section className="mt-20 flex gap-10">
        <div className="flex-1 space-y-5">
          <ProfilePicture />
          <AccountMenu />
        </div>
        <AccountMenuDetail />
      </section>
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Account Settings"
        description="Manage your personal information, update your password, and customize your account preferences all in one place."
      />
    </section>
  );
}

function ProfilePicture() {
  return (
    <section className="flex flex-col items-center rounded-2xl border bg-(--container-bg) p-5">
      <div className="bg-foreground/10 mb-5 flex h-30 w-30 items-center justify-center rounded-full text-4xl">
        U
      </div>

      <p>User Name</p>
      <p>user@mail.com</p>
    </section>
  );
}

function AccountMenu() {
  const setIndex = ProfileStore((state) => state.setIndex);
  const currentIndex = ProfileStore((state) => state.index);

  type Props = {
    Icon: React.ElementType;
    label: string;
    index: number;
  };

  function AccountMenuButton({ Icon, label, index }: Props) {
    const isActive = currentIndex === index;
    return (
      <Button
        variant="ghost"
        className={`flex justify-start gap-3 ${isActive ? "bg-foreground/10" : ""}`}
        onClick={() => setIndex(index)}
      >
        <Icon size={22} />
        <span>{label}</span>
      </Button>
    );
  }
  return (
    <section className="flex flex-col space-y-2 rounded-2xl border bg-(--container-bg) p-5">
      {menuItems.map((item, i) => (
        <AccountMenuButton key={i} {...item} />
      ))}
      <Button
        variant={"destructive"}
        className="flex justify-start gap-3"
        onClick={() => {}}
      >
        <LogOut />
        Sign out
      </Button>
    </section>
  );
}
