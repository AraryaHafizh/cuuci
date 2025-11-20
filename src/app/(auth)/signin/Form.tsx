"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const Form = () => {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof signinSchema>) {}

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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signin-form">Password</FieldLabel>
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
          <Link
            href={"/forgot-password"}
            className="w-fit text-sm opacity-50 transition duration-300 hover:opacity-100"
          >
            Forget password?
          </Link>
          <Button>Sign In</Button>
          <p className="text-center text-sm">
            <span className="opacity-50">New to cuuci? </span>
            <Link
              href="/signup"
              className="underline opacity-50 transition duration-300 hover:opacity-100"
            >
              Sign up
            </Link>
          </p>
        </FieldGroup>
      </form>
    </section>
  );
};
