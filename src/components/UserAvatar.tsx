import { auth } from '@/auth';
import Image from 'next/image';

export async function UserAvatar() {
  const session = await auth();

  if (!session || !session.user) return null;

  return (
    <div>
      <Image
        width={32}
        height={32}
        src={session.user.image ?? ''}
        alt="User Avatar"
        className="rounded-full"
      />
    </div>
  );
}
