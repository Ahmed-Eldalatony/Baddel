"use client";
import { useEffect } from "react";
import Link from "next/link";
function SignOut() {
  //! - why can't i access the signout response which will make token cookies empty in server may be try again
  useEffect(() => {
    fetch("/api/signout");
  }, []);
  // .then((response) => response);
  return (
    <div className="h-full flex items-center flex-col mt-20 ">
      <p className="text-3xl font-semibold mb-3">You have been signed out </p>
      <Link className="hover:opacity-80" href="/signin">
        Sign in ?
      </Link>
    </div>
  );
}

export default SignOut;
