import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "./chain";

import createMiddleware from "next-intl/middleware";
// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "ar"],

//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: "en",
// });

// export const config = {
//   // Skip all paths that should not be internationalized
//   matcher: ["/((?!api|.*\\..*).*)"],
// };
// export function lang() {
//   return createMiddleware({
//     //   // A list of all locales that are supported
//     locales: ["en", "ar"],

//     // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//     defaultLocale: "en",
//   });
// }

export function HandleLanguage(middleware: CustomMiddleware) {
  return createMiddleware({
    locales: ["en", "ar"],
    defaultLocale: "en",
  });
  // return middleware(request, event, response);
  // export const config = {
  //   // Skip all paths that should not be internationalized
  //   matcher: ["/((?!api|.*\\..*).*)"],
  // };

  // Call the next middleware and pass the request and response
}
