"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between py-2 px-8 border-b-[1px] sticky top-0 z-10 backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-start space-x-8">
        <Link href="/" className="text-xl font-bold flex items-center gap-1">
          <Image
            src="/images/logo.svg"
            alt="Scenarios"
            width={30}
            height={30}
          />
          ChatScripter
        </Link>
        <nav className="hidden md:flex">
          <Button asChild variant="link">
            <Link
              href="/games"
              className={`${pathname === "/games" ? "underline" : ""}`}
            >
              遊戲
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link
              href="/novels"
              className={`${pathname === "/novels" ? "underline" : ""}`}
            >
              小說
            </Link>
          </Button>
        </nav>
      </div>
      {/* <div className="flex items-center justify-end space-x-8">
        <a href="/login" className="text-sm">
          Login
        </a>
        <a href="/signup" className="text-sm">
          Sign Up
        </a>
      </div> */}
    </header>
  );
}
