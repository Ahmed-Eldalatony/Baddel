"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { cn } from "../../../lib/utils";
import axios from "axios";
function SignIn() {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const tR = useTranslations("Register");
  const router = useRouter();


  useEffect(() => {
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);

    if (!validateEmail(email)) {
      setError(tR("emailError"));
      return;
    } else {
      setError("");
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    if (password.length < 8) {
      setError(tR("passwordError"));
      return;
    } else {
      setError("");
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError(tR("emailError"));
      return;
    }

    if (password.length < 8) {
      setError(tR("passwordError"));
      return;
    }

    try {
      setButtonDisabled(true);
      setLoading(true);
      const data = await axios.post("/api/signin", {
        email,
        password,
      });
      router.push("/");
    } catch (error) {
      setError(tR("invalidData"));
    } finally {
      setLoading(false);
    }
  };

  function validateEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className=" w-96 lg:w-80 mb-32 p-5 lg:p-3 ">
        <form onSubmit={submitHandler}>
          <CardTitle className="mb-6 lg:mb-4">{tR("signin")}</CardTitle>

          <label>
            {tR("email")}
            <Input
              onChange={emailHandler}
              className="px-3 py-6 lg:py-4 mb-4 lg:mb-2"
              type="email"
              placeholder="example@gmail.com"
            />
          </label>
          <label>
            {tR("password")}
            <Input
              onChange={passwordHandler}
              className="px-3 py-6 lg:py-4 mb-4 lg:mb-2"
              type="password"
              placeholder={tR("passwordPlaceholder")}
            />
          </label>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <div className="text-sm">
            <span>{tR("account")} </span>
            <Link className="underline text-blue-600" href={"/signup"}>
              {tR("signup")}
            </Link>
          </div>
          <Button
            className={cn(
              "p-6 lg:p-4 mt-4 lg:mt-3 bg-green-600 hover:bg-green-500",
              loading && " bg-green-500 pointer-events-none",
              buttonDisabled && " bg-green-900 pointer-events-none"
            )}
            type="submit"
          >
            {loading
              ? tR("loading")
              : buttonDisabled
              ? tR("noData")
              : tR("submit")}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default SignIn;
