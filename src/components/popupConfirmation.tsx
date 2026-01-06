"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface CreateAccountConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateAccountConfirmation = ({
  open,
  onOpenChange,
}: CreateAccountConfirmationProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Just one more step!</AlertDialogTitle>
          <AlertDialogDescription>
            We’ve sent you a verification link. Confirm your email to activate
            your account and get ready for a smoother, fresher laundry
            experience!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/signin")}>
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface PassChangeConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PasswordChangeConfirmation = ({
  open,
  onOpenChange,
}: PassChangeConfirmationProps) => {
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Password changed successfully!</AlertDialogTitle>
          <AlertDialogDescription>
            You can now sign in with your new password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/signin")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SendLinkConfirmation = ({
  open,
  onOpenChange,
}: PassChangeConfirmationProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset password link sent!</AlertDialogTitle>
          <AlertDialogDescription>
            We've sent a password reset link to your email. Please check your
            inbox and follow the instructions to set a new password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/signin")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SignoutConfirmation = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leaving so soon?</AlertDialogTitle>
          <AlertDialogDescription>
            You’re about to sign out. Don’t worry, you can always come back
            later!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              queryClient.clear();
              signOut({ callbackUrl: "/" });
            }}
            className="bg-transparant hover:bg-destructive active:bg-destructive border-destructive text-destructive border hover:text-white active:text-white"
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface SignInNeededDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SignInNeededDialog = ({
  open,
  onOpenChange,
}: SignInNeededDialogProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign In Required</AlertDialogTitle>
          <AlertDialogDescription>
            You need to sign in to continue. Please log in to your account to
            proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/auth/signin")}>
            Go to Sign In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface SuparAdminConfirmationProps {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuparAdminConfirmation = ({
  title,
  description,
  open,
  onOpenChange,
}: SuparAdminConfirmationProps) => {
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.back()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
