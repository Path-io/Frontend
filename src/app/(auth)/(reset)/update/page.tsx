"use client";

import { supabase } from "@/client";
import CustomField from "@/components/custom/field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { updatePasswordSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

export default function UpdatePassword() {
  const [isValidRecovery, setIsValidRecovery] = useState(false);
  const router = useRouter();
  const [recoveryChecked, setRecoveryChecked] = useState(false);

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(info: z.infer<typeof updatePasswordSchema>) {
    if (info.password !== info.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: info.password,
    });

    if (error) {
      console.error("Failed to update password:", error);
      toast.error("Failed to update password. Please try again.");
      return;
    }

    toast.success("Password updated — please log in.");
    router.replace("/login");
  }

  const searchParams = useSearchParams();

  useEffect(() => {
    let timeoutId: number | null = null;
    const type = searchParams.get("type");
    const token = searchParams.get("access_token") || searchParams.get("token");

    if (type === "recovery" || token) {
      setIsValidRecovery(true);
    }

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setIsValidRecovery(true);
        }
      }
    );

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data?.session) {
          setIsValidRecovery(true);
        }
      })
      .finally(() => {
        timeoutId = window.setTimeout(() => {
          setRecoveryChecked(true);
        }, 1500);
      });

    return () => {
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, [searchParams]);

  useEffect(() => {
    if (recoveryChecked && !isValidRecovery) {
      toast.error(
        "Invalid or expired recovery link. Please request a new one."
      );
      router.replace("/forgot");
    }
  }, [recoveryChecked, isValidRecovery, router]);
  if (!recoveryChecked) {
    return null;
  }

  if (!isValidRecovery) {
    return null;
  }

  return (
    <Card className="md:w-[384px] items-center shadow-none md:shadow-sm border-none md:border-solid w-full">
      <CardHeader className="text-center md:text-left w-full">
        <CardTitle className="font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password and confirm it to set a new password.
        </CardDescription>
      </CardHeader>
      <Separator className="md:hidden max-w-87/100" />
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CustomField
              control={form.control}
              formValue="password"
              placeholder="••••••••••"
              password
            />
            <CustomField
              control={form.control}
              formValue="confirmPassword"
              formLabel="Confirm Password"
              placeholder="••••••••••"
              password
            />
            <Button type="submit" className="w-full cursor-pointer">
              Set New Password
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="w-full">
        <CardAction className="text-sm">
          <Link href="/login">&#8592; Back to Login</Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
