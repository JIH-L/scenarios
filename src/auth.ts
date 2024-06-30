import NextAuth, { User } from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      profile(profile) {
        return {
          role: profile.role ?? 'user', // 默認為 'user'
          image: profile.picture,
          ...profile,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: any; user: User }) {
      // 假設根據用戶的電子郵件地址來決定角色
      if (user) {
        if (user.email === process.env.ADMIN_EMAIL) {
          token.role = 'admin';
        } else {
          token.role = 'user';
        }
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role; // 確保 session 中也包含角色資訊
      return session;
    },
  },
});
