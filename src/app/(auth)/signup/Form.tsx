"use client";

import { GoogleAuth } from "@/components/GoogleAuth";
import { CreateAccountConfirmation } from "@/components/popupConfirmation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useSignup } from "@/hooks/auth/useSignup";
import { formatPhoneDisplay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const signupSchema = z.object({
  name: z.string().min(4, "Username must be at least 4 characters long."),
  email: z.email(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  role: z.string().optional(),
  outletId: z.string().optional(),
});

export const Form = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "CUSTOMER",
      password: "",
    },
  });

  const {
    mutateAsync: signup,
    isPending,
    openDialog,
    setOpenDialog,
  } = useSignup();

  function onSubmit(data: z.infer<typeof signupSchema>) {
    const final = {
      ...data,
      phoneNumber: "+62" + data.phoneNumber,
    };
    signup(final);
  }

  return (
    <section>
      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">Username</FieldLabel>
                <Input
                  {...field}
                  id="signup-form"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">Email</FieldLabel>
                <Input
                  {...field}
                  id="signup-form"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Phone Number</FieldLabel>
                <div className="relative flex-2">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs opacity-60 md:text-sm">
                    +62
                  </span>
                  <Input
                    {...field}
                    className="pl-10"
                    inputMode="numeric"
                    value={formatPhoneDisplay(field.value ?? "")}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      field.onChange(raw);
                    }}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">Password</FieldLabel>
                <Input
                  {...field}
                  id="signup-form"
                  type="password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex flex-col gap-2">
            <GoogleAuth />
            <Button>{isPending ? <LoadingAnimation /> : "Sign up"}</Button>
          </div>

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
      <CreateAccountConfirmation
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </section>
  );
};
