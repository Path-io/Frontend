"use client";

import { loginSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form
} from "@/components/ui/form";
import CustomField from "@/components/custom/field";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
  }
  return (
    <div className="form w-full flex flex-col justify-center px-[10%] md:px-[20%] space-y-8 text-foreground">
      <div className="title">
        <h2 className="text-xl font-bold">Login</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details below to login
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <CustomField
            control={form.control}
            formValue="email"
            placeholder="team@pathio.com"
          />
          <CustomField
            control={form.control}
            formValue="password"
            placeholder="••••••••••"
            password
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button type="submit" variant={"outline"} className="w-full">
            Login with Google
          </Button>
        </form>
      </Form>
      <div className="footer mt-2 items-center md:items-start text-center text-sm flex flex-col-reverse md:flex-col gap-4">
        <p className="flex gap-1">
          {" "}
          <span className="hidden md:flex">Don&apos;t have an account? </span>
          <span className="md:hidden">New to Path.io? </span>{" "}
          <Link className="underline" href={"/register"}>
            Sign up
          </Link>
        </p>
        <Link className="hover:underline" href={"/forgot"}>
          Forgot your password?
        </Link>
      </div>
      <div className="mobile-footer mt-2 md:hidden text-center flex flex-col gap-6">
        <hr />
        <p className="text-muted-foreground text-sm">
          {" "}
          &copy; {new Date().getFullYear()} Path.io{" "}
        </p>
      </div>
    </div>
  );
}
