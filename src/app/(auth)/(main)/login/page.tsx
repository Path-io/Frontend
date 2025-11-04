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
import { supabase } from "@/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(info: z.infer<typeof loginSchema>) {
    try{
      const{ error } = await supabase.auth.signInWithPassword({
        email: info.email,
        password: info.password,
      })

      if(error){
        console.error("Error occurred while signing in:", error);
        return;
      }

      router.push('/');
    } catch(err) {
      console.error(err);
    }
  }

  async function handleGoogle(){
    try{
      const {error} = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent"
          }
        }
      })

      if (error) {
        console.error("Error signing in with Google:", error);
        return;
      }
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="form w-full flex bg-background flex-col justify-center px-[10%] md:px-[20%] space-y-8 text-foreground">
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
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
          <Button onClick={handleGoogle} variant={"outline"} className="w-full">
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
