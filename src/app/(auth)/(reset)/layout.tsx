import Image from "next/image";

export default function AuthResetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center justify-center md:justify-start md:pt-20 flex-col gap-14 h-full">
      <div className="logo-container hidden md:flex">
        <Image
          src={"/logo/logo-dark-2xl.svg"}
          width={135}
          height={36}
          alt="Path.io logo"
        />
      </div>
      <div className="w-full flex items-center justify-center">{children}</div>
    </div>
  );
}
