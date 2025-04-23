"use client";

import { Button } from "@/components/ui/button";
import { SITE_INFORMATION } from "@/siteinformation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("google");
      if (response?.ok) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast(error.message || "Something wrong");
      console.log(error);
    }
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-1 md:justify-start">
          <Image
            src={SITE_INFORMATION.logo}
            height={22}
            width={22}
            alt="logo"
          />
          <a href="#" className="font-bold text-lg">
            {SITE_INFORMATION.name}
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
              </p>
            </div>

            <Button variant="outline" className="w-full" onClick={handleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
            <div className="text-balance text-center text-xs text-muted-foreground ">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms-conditions"
                className="text-black underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-black underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/assets/workspace.jpg"
          alt="Image"
          draggable={false}
          fill
          // className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
