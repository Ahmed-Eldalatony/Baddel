"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import { Button } from "../ui/button";
import { cn } from "@/src/app/lib/utils";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const tR = useTranslations("Register");
  const router = useRouter();
  const locale = useLocale();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Check for autofill values on mount and when they change
  useEffect(() => {
    const checkAutofill = () => {
      // Check actual input values after a short delay to allow autofill
      setTimeout(() => {
        const emailValue = emailRef.current?.value || "";
        const passwordValue = passwordRef.current?.value || "";

        if (emailValue !== email) setEmail(emailValue);
        if (passwordValue !== password) setPassword(passwordValue);
      }, 100);
    };

    // Initial check for autofill
    checkAutofill();

    // Add animationstart listener for Chrome autofill detection
    const handleAnimationStart = (e: AnimationEvent) => {
      if (e.animationName === "onAutoFillStart") {
        checkAutofill();
      }
    };

    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;

    emailInput?.addEventListener(
      "animationstart",
      handleAnimationStart as EventListener,
    );
    passwordInput?.addEventListener(
      "animationstart",
      handleAnimationStart as EventListener,
    );

    return () => {
      emailInput?.removeEventListener(
        "animationstart",
        handleAnimationStart as EventListener,
      );
      passwordInput?.removeEventListener(
        "animationstart",
        handleAnimationStart as EventListener,
      );
    };
  }, []);

  // Update button state when email or password changes
  useEffect(() => {
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue && !validateEmail(emailValue)) {
      setError(tR("emailError"));
      return;
    } else {
      setError("");
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue && passwordValue.length < 8) {
      setError(tR("passwordError"));
      return;
    } else {
      setError("");
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update state with current values in case of autofill
    const currentEmail = emailRef.current?.value || email;
    const currentPassword = passwordRef.current?.value || password;

    if (!validateEmail(currentEmail)) {
      setError(tR("emailError"));
      return;
    }

    if (currentPassword.length < 8) {
      setError(tR("passwordError"));
      return;
    }

    try {
      setButtonDisabled(true);
      setLoading(true);
      const response = await axios.post("/api/signin", {
        email: currentEmail,
        password: currentPassword,
      });
      router.push("/");
    } catch (error: any) {
      setError(error.response?.data?.message || tR("invalidData"));
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  function validateEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="w-96 lg:w-80 mb-32 p-5 lg:p-3">
        <form onSubmit={submitHandler}>
          <CardTitle className="mb-6 lg:mb-4">{tR("signin")}</CardTitle>

          <label className="block mb-4">
            {tR("email")}
            <Input
              ref={emailRef}
              value={email}
              onChange={emailHandler}
              className="px-3 py-6 lg:py-4 mt-1"
              type="email"
              placeholder="example@gmail.com"
              autoComplete="email"
            />
          </label>

          <label className="block mb-4">
            {tR("password")}
            <Input
              ref={passwordRef}
              value={password}
              onChange={passwordHandler}
              className="px-3 py-6 lg:py-4 mt-1"
              type="password"
              placeholder={tR("passwordPlaceholder")}
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <div className="text-sm mb-4">
            <span>{tR("account")} </span>
            <Link
              className="underline text-blue-600"
              href={`/${locale}/signup`}
            >
              {tR("signup")}
            </Link>
          </div>

          <Button
            className={cn(
              "p-6 lg:p-4 w-full bg-green-600 hover:bg-green-500",
              loading && "bg-green-500 pointer-events-none",
              buttonDisabled && "bg-green-900 pointer-events-none",
            )}
            type="submit"
            disabled={buttonDisabled || loading}
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
