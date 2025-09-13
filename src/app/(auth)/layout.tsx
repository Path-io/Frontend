import { pros } from "@/lib/staticLists";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            {children}
      </div>
    </div>
  );
}
