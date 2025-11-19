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
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const signinSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const Form = () => {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof signinSchema>) {}

  return (
    <section>
      <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signin-form">New Password</FieldLabel>
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
          <Button>Reset Password</Button>
        </FieldGroup>
      </form>
    </section>
  );
};
