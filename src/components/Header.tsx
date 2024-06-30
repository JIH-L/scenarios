import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import logo from '@/../public/images/logo.svg';
import { Button } from '@/components/ui/button';
import { SignIn } from '@/components/SignIn';
// import { SignOut } from '@/components/SignOut';
// import { UserAvatar } from '@/components/UserAvatar';
import { AccountDropdown } from '@/components/AccountDropdown';

export async function Header() {
  const session = await auth();
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
            <Link href="/games">遊戲</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/novels">小說</Link>
          </Button>
        </nav>
      </div>
      <div className="flex items-center justify-end space-x-8">
        {session && session.user ? <AccountDropdown /> : <SignIn />}
      </div>
    </header>
  );
}
