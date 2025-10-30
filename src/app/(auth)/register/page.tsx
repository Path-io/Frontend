"use client";

import { FaArrowRight } from "react-icons/fa";
import CustomField from "@/components/custom/field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { registerSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { supabase } from "@/client";

export default function SignUp() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      role: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(info: z.infer<typeof registerSchema>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: info.email,
        password: info.password,
      });

      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
    } catch (err) {
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
    <div className="form w-full flex flex-col justify-center px-[10%] md:px-[20%] space-y-8 text-foreground">
      <div className="title">
        <h2 className="text-xl font-bold">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Get started with Path.io today.
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-50">
                    <SelectGroup>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomField
            control={form.control}
            formValue="password"
            placeholder="••••••••••"
            formLabel="New Password"
            password
          />
          <CustomField
            control={form.control}
            formValue="confirmPassword"
            placeholder="••••••••••"
            formLabel="Confirm Password"
            password
          />
          <Button type="submit" className="w-full">
            Create Account <FaArrowRight />
          </Button>
          <Button onClick={handleGoogle} type="button" variant={"outline"} className="w-full">
            Continue with Google
          </Button>
        </form>
      </Form>
      <div className="footer mt-2 items-center md:items-start text-center text-sm flex flex-col-reverse md:flex-col gap-4">
        <p className="flex gap-1">
          Already have an account?
          <Link className="underline" href={"/login"}>
            Login
          </Link>
        </p>
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
