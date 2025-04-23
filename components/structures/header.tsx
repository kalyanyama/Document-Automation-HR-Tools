"use client";
import { SITE_INFORMATION } from "@/siteinformation";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <>
      <div className="z-50 flex justify-between items-center rounded-md h-12 px-5 mt-4 border sticky top-0 backdrop-blur-md bg-black/5">
        <h3 className="font-bold">{SITE_INFORMATION.name}</h3>
        <Button
          size={"sm"}
          variant={"destructive"}
          className="px-2 py-1 shadow h-fit text-xs"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Log-out
        </Button>
      </div>
    </>
  );
};

export default Header;
