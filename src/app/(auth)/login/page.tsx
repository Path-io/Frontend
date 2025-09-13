"use client";

import Image from "next/image";
import { pros } from "@/lib/staticLists";
import { loginSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-primary-foreground md:px-[6%] hidden md:flex w-1/2 gap-8 flex-col items-center justify-center">
        <div className="logo w-full flex items-start">
          <Image
            src={"/logo/logo-dark-2xl.svg"}
            width={130}
            height={35}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="title space-y-4">
            <p className="text-foreground font-extralight text-4xl">
              One step away from conquering that course.
            </p>
            <p>
              A platform that gets out of your way and helps you focus on what
              matters most: learning and teaching.
            </p>
          </div>
          <ul className="flex flex-col justify-center gap-3">
            {pros.map((pro, index) => (
              <li key={index} className="flex gap-2">
                {" "}
                <Image
                  width={24}
                  height={24}
                  alt="List Item"
                  src={"/images/listCheck.svg"}
                />{" "}
                {pro}{" "}
              </li>
            ))}
          </ul>
          <hr />
          <p>
            No distractions, no hidden costs — just a clear path to knowledge.
            Path.io makes my learning so much easier!
          </p>
          <hr />
          <p className="text-muted-foreground text-sm">
            {" "}
            &copy; {new Date().getFullYear()} Path.io{" "}
          </p>
        </div>
      </div>
      <div className="bg-white w-full md:w-1/2 flex items-center justify-center">
        <div className="form w-full px-[10%] md:px-[20%] space-y-8 text-foreground">
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
              <span className="hidden md:flex">Don't have an account? </span>
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
      </div>
    </div>
  );
}
