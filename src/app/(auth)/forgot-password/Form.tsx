"use client";

import { SendLinkConfirmation } from "@/components/popupConfirmation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const Form = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutateAsync: forgotPassword,
    isPending,
    openDialog,
    setOpenDialog,
  } = useForgotPassword();

  function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    forgotPassword(data);
  }

  return (
    <section>
      <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signin-form">Email</FieldLabel>
                <Input
                  {...field}
                  id="signin-form"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button>
            {isPending ? <LoadingAnimation /> : "Send reset link"}
          </Button>
          <p className="text-center text-sm">
            <span className="opacity-50">Already have account? </span>
            <Link
              href="/signin"
              className="underline opacity-50 transition duration-300 hover:opacity-100"
            >
              Sign in
            </Link>
          </p>
        </FieldGroup>
      </form>
      <SendLinkConfirmation open={openDialog} onOpenChange={setOpenDialog} />
    </section>
  );
};
