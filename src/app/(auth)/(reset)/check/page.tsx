"use client";

import { supabase } from "@/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface resendTimerType {
  cooldown: number;
  disabled: boolean;
  attempts: number;
}

export default function CheckEmail() {
  const BASE_SECONDS = 30;
  const [attempts, setAttempts] = useState<number>(1);
  const [remaining, setRemaining] = useState<number>(attempts * BASE_SECONDS);
  const [disabled, setDisabled] = useState<boolean>(true);
  const intervalRef = useRef<number | null>(null);
  const [resetEmail, setResetEmail] = useState<string | null>("");

  useEffect(() => {
    const e = sessionStorage.getItem("resetEmail");
    setResetEmail(e);
  }, []);

  const startCooldown = (seconds: number) => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setRemaining(seconds);
    setDisabled(true);

    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setDisabled(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startCooldown(attempts * BASE_SECONDS);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleResend = async () => {
    if (!resetEmail) {
      console.error("No reset email found in sessionStorage");
      return;
    }

    try {
      await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${process.env.BASE_URL}/update`,
      });
    } catch (err) {
      console.error("Failed to resend magic link", err);
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    startCooldown(nextAttempts * BASE_SECONDS);
  };

  return (
    <Card className="md:w-[384px] items-center justify-center shadow-none md:shadow-sm border-none md:border-solid w-full">
      <CardHeader className="text-center items-center justify-center w-full">
        <CardTitle className="font-bold items-center justify-center flex">
          {" "}
          <Image
            src={"/images/squiggleCheck.svg"}
            alt="Check your email"
            width={40}
            height={40}
          />{" "}
        </CardTitle>
        <CardTitle className="font-bold">Check your email!</CardTitle>
        <CardDescription>
          We sent you a magic link to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex gap-2 flex-col">
        <Button className="cursor-pointer">
          <Link href={"mailto:"}>Open Email App</Link>
        </Button>
        <Button
          variant={"outline"}
          disabled={disabled}
          className="cursor-pointer"
          onClick={handleResend}
        >
          {disabled ? `Resend Email (${remaining}s)` : "Resend Email"}
        </Button>
      </CardContent>
    </Card>
  );
}
