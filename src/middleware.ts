import { auth } from '@/auth';

export default auth((req: any) => {
  if (req.auth?.user.role !== 'admin' && req.nextUrl.pathname === '/upload') {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
