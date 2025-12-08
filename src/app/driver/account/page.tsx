"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, LogOut } from "lucide-react";

export default function Account() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 mb-5 flex-1 gap-5 space-y-5 md:mb-0 md:flex xl:mt-20">
        <AccountMenu />
        <Password />
      </section>
    </main>
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

function AccountMenu() {
  return (
    <section className="scroll-hidden flex flex-1 gap-1 overflow-x-auto rounded-lg border bg-(--container-bg) p-2 select-none md:flex-col md:gap-0 md:space-y-2 md:rounded-2xl md:p-5">
      <Button
        variant="ghost"
        className="bg-foreground/10 flex justify-start gap-3"
        onClick={() => {}}
      >
        <Lock />
        Password
      </Button>
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

function Password() {
  return (
    <div className="flex-2 rounded-2xl border bg-(--container-bg) p-5">
      <p>Update Password</p>
      <p className="text-sm font-light opacity-50">
        Update your account password to keep your profile secure.
      </p>
      <Separator className="my-5" />
      <div className="mb-5 gap-10 space-y-5 md:flex">
        <div className="w-full space-y-4">
          <Label>Old Password</Label>
          <Input placeholder="****"></Input>
        </div>
        <div className="w-full space-y-4">
          <Label>New Password</Label>
          <Input placeholder="****"></Input>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Update Password</Button>
      </div>
    </div>
  );
}
