import { signOut } from '@/auth';

export function SignOut() {
  return (
    <form
      className="w-full"
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="w-full border-none text-start" type="submit">
        登出
      </button>
    </form>
  );
}
