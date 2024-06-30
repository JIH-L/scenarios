import { signIn } from '@/auth';

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <button type="submit" className="text-sm hover:underline">
        登入
      </button>
    </form>
  );
}
