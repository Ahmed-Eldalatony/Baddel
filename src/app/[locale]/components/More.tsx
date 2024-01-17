"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
function More() {
  const searchParams = useSearchParams();
  const p = searchParams.get("p") ?? 1;
  const [page, setPage] = useState(p);
  const [message, setMessage] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      router.push(`?p=${page}`);
    }
  }, [page]);
  return (
    <>
      <Button
        variant={"link"}
        className="text-center p-2 block mx-auto mt-6 text-blue-600 font-semibold underline text-lg hover:opacity-80"
        onClick={() => {
          +page < 3 ? setPage((prev) => +prev + 1) : setMessage(true);
        }}
      >
        {!message && "More"}
      </Button>
      {message && (
        <p className="text-center text-2xl font-semibold text-red-600 mb-10">
          No more Products
        </p>
      )}
    </>
  );
}

export default More;
