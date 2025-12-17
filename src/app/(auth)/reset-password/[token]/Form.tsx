"use client";

import { PasswordChangeConfirmation } from "@/components/popupConfirmation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const Form = ({ token }: { token: string }) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    mutateAsync: newPassword,
    isPending,
    openDialog,
    setOpenDialog,
  } = useResetPassword(token);

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    newPassword(data);
  }

  return (
    <section>
      <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-password-form">New Password</FieldLabel>
                <Input
                  {...field}
                  id="reset-password-form"
                  type="password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button>
            {isPending ? <LoadingAnimation /> : "Change password"}
          </Button>
        </FieldGroup>
      </form>
      <PasswordChangeConfirmation
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </section>
  );
};
