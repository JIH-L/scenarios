'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import logo from '@/../public/images/logo.svg';
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b-[1px] bg-background/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
      <div className="flex items-center justify-start space-x-2">
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <Image
            src={logo}
            alt="Scenarios"
            width={30}
            height={30}
            priority={true}
          />
          <span className="hidden md:block">ChatScripter</span>
        </Link>
        <nav className="flex">
          <Button asChild variant="link">
            <Link
              href="/games"
              className={`${pathname === '/games' ? 'underline' : ''}`}
            >
              遊戲
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link
              href="/novels"
              className={`${pathname === '/novels' ? 'underline' : ''}`}
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
