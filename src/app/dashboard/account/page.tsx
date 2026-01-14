"use client";

import { SignoutConfirmation } from "@/components/popupConfirmation";
import SectionInfo from "@/components/SectionInfo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LoadingAnimation,
  LoadingScreen,
} from "@/components/ui/loading-animation";
import { useUpdateProfilePicture } from "@/hooks/user/useUpdateProfilePicture";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { menuItems } from "./data";
import { AccountMenuDetail } from "./MenuDetail";
import { ProfileStore } from "./store";

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

function ProfilePicture({ session }: { session: any }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const sessionData = session.user;
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: updateProfilePicture, isPending } =
    useUpdateProfilePicture();

  useEffect(() => {
    if (!isDialogOpen && preview) {
      URL.revokeObjectURL(preview);
      setImage(null);
      setPreview(null);
    }
  }, [isDialogOpen, preview]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      toast.error("Image must be less than 1MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const url = URL.createObjectURL(file);
    setImage(file);
    setPreview(url);
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.error("Please select an image first");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("profilePictureUrl", image);

      await updateProfilePicture(formData);
      toast.success("Profile picture updated successfully!");
      setIsDialogOpen(false);

      if (preview) URL.revokeObjectURL(preview);
      setImage(null);
      setPreview(null);
    } catch (error) {
      toast.error("Failed to update profile picture");
    }
  };

  const handleDialogClose = () => {
    if (isPending) return;
    setIsDialogOpen(false);
  };

  return (
    <>
      <section className="flex flex-col items-center rounded-2xl border bg-(--container-bg) p-5">
        <div
          onClick={() => setIsDialogOpen(true)}
          className="bg-foreground/10 hover:bg-foreground/30 active:bg-foreground/30 mb-5 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full text-4xl transition-all duration-300 select-none"
        >
          {sessionData.profilePictureUrl ? (
            <img
              height={30}
              width={30}
              src={sessionData.profilePictureUrl}
              alt="Profile"
              className="h-30 w-30 rounded-full object-cover"
            />
          ) : (
            sessionData.name[0].toUpperCase()
          )}
        </div>

        <p>{sessionData.name}</p>
        <p className="text-muted-foreground text-sm">{sessionData.email}</p>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Choose a new profile picture. Image must be less than 1MB.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isPending}
            />

            <div className="flex flex-col items-center gap-4">
              <div
                onClick={() => !isPending && inputRef.current?.click()}
                className={`bg-foreground/10 hover:bg-foreground/20 flex h-40 w-40 cursor-pointer items-center justify-center rounded-full text-6xl transition-all ${
                  isPending ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-40 w-40 rounded-full object-cover"
                  />
                ) : sessionData.profilePictureUrl ? (
                  <img
                    src={sessionData.profilePictureUrl}
                    alt="Current"
                    className="h-40 w-40 rounded-full object-cover"
                  />
                ) : (
                  sessionData.name[0].toUpperCase()
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => inputRef.current?.click()}
                disabled={isPending}
              >
                Choose Image
              </Button>

              {image && (
                <p className="text-muted-foreground text-sm">
                  {image.name} ({(image.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDialogClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!image || isPending}>
              {isPending ? <LoadingAnimation /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
