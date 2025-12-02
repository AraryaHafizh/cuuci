"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, LogOut } from "lucide-react";

export default function Account() {
  return (
    <main className="pt-50">
      <Greeting />
      <section className="mt-20 flex gap-5">
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
    <section className="flex flex-1 flex-col space-y-2 rounded-2xl border bg-(--container-bg) p-5">
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
      <p className="text-xl font-bold">Update Password</p>
      <p className="font-light opacity-50">
        Update your account password to keep your profile secure.
      </p>
      <Separator className="my-5" />
      <div className="mb-5 flex gap-10">
        <div className="w-full space-y-4">
          <Label>Old Password</Label>
          <Input></Input>
        </div>
        <div className="w-full space-y-4">
          <Label>New Password</Label>
          <Input></Input>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Update Password</Button>
      </div>
    </div>
  );
}
