// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// export function getSearchParam(param: string, url: any) {
//   return url.searchParams.get(param);
// }
// export  async function HandleAuth(request: NextRequest) {
//   //  async function (request: NextRequest) {
//   // const path = request.nextUrl;
//   console.log("path====");
//   const path = request.nexturl.pathname;
//   console.log("path====",path)
//   const ispublicpath =
//     path === "/signin" || path === "/signup" || path === "/verifyemail";
//   // // path === "/signout";
//   const token = request.cookies.get("token")?.value || "";
//   if (path.includes("/categories/categories")) {
//     console.log("duplicate");
//     const patharray = path.split("/");
//     const redirectcategory = patharray[patharray.length - 1];
//     return nextresponse.redirect(
//       new url(`/categories/${redirectcategory}`, request.nexturl)
//     );
//   }
//   if (ispublicpath && token) {
//     return nextresponse.redirect(new url("/", request.nexturl));
//   }
//   };
//   // if (!isPublicPath && !token) {
//   //   return NextResponse.redirect(new URL('/login', request.nextUrl))
//   // }
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "./chain";

export function HandleAuth(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // The first middleware in the chain has to create the response
    // object and pass it down the chain.
    const response = NextResponse.next();
    response.cookies.set("vercel", "fast");

    const path = request.nextUrl.pathname;
    const isPublicPath =
      path === "/signin" || path === "/signup" || path === "/verifyemail";
    //   // // path === "/signout";
    const token = request.cookies.get("token")?.value || "";
    if (isPublicPath && token) {
      return Response.redirect(new URL("/", request.nextUrl));
    }
    if (path.includes("/categories/categories")) {
      console.log("duplicate");
      const pathArray = path.split("/");
      const redirectCategory = pathArray[pathArray.length - 1];
      return NextResponse.redirect(
        new URL(`/categories/${redirectCategory}`, request.nextUrl)
      );
    }

    request.cookies.set("HandleAuth", "true");

    // Call the next middleware and pass the request and response
    return middleware(request, event, response);
  };
}
