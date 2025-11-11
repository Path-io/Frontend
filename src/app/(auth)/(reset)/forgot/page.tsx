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
import { resetSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";

export default function ResetPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });
  
  async function onSubmit(info: z.infer<typeof resetSchema>) {
    const { error } = await supabase.auth.resetPasswordForEmail(info.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}update`,
    });


    if (error) {
      console.log(error);
      return;
    }
    sessionStorage.setItem("resetEmail", info.email);
    router.push("/check");
  }

  return (
    <Card className="md:w-[384px] items-center shadow-none md:shadow-sm border-none md:border-solid w-full">
      <CardHeader className="text-center md:text-left w-full">
        <CardTitle className="font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we will send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <Separator className="md:hidden max-w-87/100" />
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CustomField
              control={form.control}
              formValue="email"
              placeholder="team@pathio.com"
            />
            <Button type="submit" className="w-full cursor-pointer">
              Send Reset Email
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
