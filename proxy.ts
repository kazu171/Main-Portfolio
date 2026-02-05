import createMiddleware from 'next-intl/middleware';
import {routing} from './routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - Static files (e.g. favicon.ico, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
