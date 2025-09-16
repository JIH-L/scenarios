import Link from 'next/link';
import { LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOut } from '@/components/SignOut';
import { UserAvatar } from '@/components/UserAvatar';
import { auth } from '@/auth';
import { User } from 'next-auth';
interface ExtendedUser extends User {
  role?: string;
}

export async function AccountDropdown() {
  const session = await auth();
  const userWithRole = session?.user as ExtendedUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full border-none p-1">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userWithRole?.role === 'admin' ? (
          <>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <Link href="/upload" className="w-full">
                新增文章
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
