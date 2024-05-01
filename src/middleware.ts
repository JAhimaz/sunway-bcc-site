import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales } from "@/components/navigation";

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: "en",
    localePrefix: 'always'
  });

  return handleI18nRouting(request);
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - login
   * - auth
   * - link_account
   * - site
   */
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],

};