"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "../../../lib/utils";
import { useTranslations } from "next-intl";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tR = useTranslations("Register");

  // Refs for autofill detection
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Autofill detection effect
  useEffect(() => {
    const checkAutofill = () => {
      setTimeout(() => {
        const usernameValue = usernameRef.current?.value || "";
        const emailValue = emailRef.current?.value || "";
        const passwordValue = passwordRef.current?.value || "";

        if (usernameValue !== username) setUsername(usernameValue);
        if (emailValue !== email) setEmail(emailValue);
        if (passwordValue !== password) setPassword(passwordValue);
      }, 100);
    };

    // Initial check
    checkAutofill();

    // Animation event listeners for autofill detection
    const handleAnimationStart = (e: AnimationEvent) => {
      if (e.animationName === "onAutoFillStart") {
        checkAutofill();
      }
    };

    const usernameInput = usernameRef.current;
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;

    usernameInput?.addEventListener(
      "animationstart",
      handleAnimationStart as EventListener,
    );
    emailInput?.addEventListener(
      "animationstart",
      handleAnimationStart as EventListener,
    );
    passwordInput?.addEventListener(
      "animationstart",
      handleAnimationStart as EventListener,
    );

    return () => {
      usernameInput?.removeEventListener(
        "animationstart",
        handleAnimationStart as EventListener,
      );
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

  useEffect(() => {
    if (username && email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username, email, password]);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue && !emailRegex.test(emailValue)) {
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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use current values in case of autofill
    const currentUsername = usernameRef.current?.value || username;
    const currentEmail = emailRef.current?.value || email;
    const currentPassword = passwordRef.current?.value || password;

    if (!currentUsername) {
      setError(tR("usernameError"));
      return;
    }

    if (!emailRegex.test(currentEmail)) {
      setError(tR("emailError"));
      return;
    }

    if (currentPassword.length < 8) {
      setError(tR("passwordError"));
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/signup", {
        username: currentUsername,
        email: currentEmail,
        password: currentPassword,
      });

      if (res.status === 200) {
        router.push("/en/checkemail");
      } else {
        setError("User registration failed.");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="w-96 lg:w-80 mb-32 p-5 lg:p-3">
        <form onSubmit={submitHandler}>
          <CardTitle className="mb-6 lg:mb-4">{tR("signup")}</CardTitle>

          <label className="block mb-4">
            {tR("name")}
            <Input
              ref={usernameRef}
              value={username}
              onChange={nameHandler}
              className="px-3 py-6 lg:py-4 mt-1"
              type="text"
              placeholder={tR("namePlaceholder")}
              autoComplete="username"
            />
          </label>

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
              autoComplete="new-password"
            />
          </label>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Button
            className={cn(
              "p-6 lg:p-4 w-full mt-4 lg:mt-3 bg-green-600 hover:bg-green-500",
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

export default SignUp;
