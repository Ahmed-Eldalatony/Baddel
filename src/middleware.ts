import createMiddleware from "next-intl/middleware";
import { NextMiddleware, NextRequest } from "next/server";
import { stackMiddlewares } from "./middlewares/StackHandler";
import { HandleAuth } from "./middlewares/HandleAuth";
import { HandleLanguage } from "./middlewares/HandleLanguages";
// export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

// const mid = () => {
//   return createMiddleware({
//     locales: ["en", "ar"],
//     defaultLocale: "en",
//   });
// };
// const midRedirect = (req: NextRequest) => {
//   console.log("the path===", req?.nextUrl?.pathname);
// };
// export const config = {
//   matcher: ["/((?!api|.*\\..*).*)"],
// };
// const middlewares = [mid, midRedirect, HandleAuth];
// export default stackMiddlewares(middlewares);

import { chain } from "./middlewares/chain";

export default chain([HandleAuth, HandleLanguage]);

// matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
export const config = {
  matcher: ["/((?!api|.*\\..*).*)"],
};