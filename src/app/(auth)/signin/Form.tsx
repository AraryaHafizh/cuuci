"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useSignin } from "@/hooks/auth/useSignin";
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

  const { mutateAsync: signin, isPending } = useSignin();

  function onSubmit(data: z.infer<typeof signinSchema>) {
    signin(data);
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signin-form">Password</FieldLabel>
                <Input
                  {...field}
                  id="signin-form"
                  type="password"
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

          <div className="flex flex-col gap-2">
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
            <Button>{isPending ? <LoadingAnimation /> : "Sign in"}</Button>
          </div>

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
