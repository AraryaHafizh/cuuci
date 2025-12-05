"use client";

import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { menuItems } from "./data";
import { AccountMenuDetail } from "./MenuDetail";
import { ProfileStore } from "./store";
import { SignoutConfirmation } from "@/components/popup-confirmation";
import { useSession } from "next-auth/react";
import { LoadingScreen } from "@/components/ui/loading-animation";

export default function Account() {
  const { data: session, status } = useSession();

  if (status === "loading") return <LoadingScreen />;

  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 gap-5 md:flex xl:mt-20">
        <div className="mb-5 flex-1 space-y-5 md:mb-0">
          <ProfilePicture session={session} />
          <AccountMenu />
        </div>
        <AccountMenuDetail session={session}/>
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

function ProfilePicture({ session }: { session: any }) {
  const sessionData = session.user;

  return (
    <section className="flex flex-col items-center rounded-2xl border bg-(--container-bg) p-5">
      <div className="bg-foreground/10 mb-5 flex h-30 w-30 items-center justify-center rounded-full text-4xl">
        {sessionData.name[0].toUpperCase()}
      </div>

      <p>{sessionData.name}</p>
      <p>{sessionData.email}</p>
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
    <section className="scroll-hidden flex gap-1 overflow-x-auto rounded-lg border bg-(--container-bg) p-2 select-none md:flex-col md:gap-0 md:space-y-2 md:rounded-2xl md:p-5">
      {menuItems.map((item, i) => (
        <AccountMenuButton key={i} {...item} />
      ))}
      <SignoutConfirmation>
        <Button variant={"destructive"} className="flex justify-start gap-3">
          <LogOut />
          Sign out
        </Button>
      </SignoutConfirmation>
    </section>
  );
}
