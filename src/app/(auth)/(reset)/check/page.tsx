import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CheckEmail() {
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
       
      </CardContent>
      <CardFooter className="w-full">
        <CardAction className="text-sm">
          {/* <Link href="/login">&#8592; Back to Login</Link> */}
        </CardAction>
      </CardFooter>
    </Card>
  );
}
