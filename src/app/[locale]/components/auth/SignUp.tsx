"use client";
import { useEffect, useState } from "react";
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
  const [dataTranslate, setDataTranslated] = useState();
  // useEffect(() => {
  //   fetch(`/api/translate`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res.message);
  //     });
  // }, []);
  useEffect(() => {
    if (username && email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Add email validation
    if (!emailRegex.test(e.target.value)) {
      setError(tR("emailError"));
      return;
    } else {
      setError("");
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.length < 8) {
      setError(tR("passwordError"));
      return;
    } else {
      setError("");
    }
  };
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setError(tR("usernameError"));
      return;
    }

    if (!emailRegex.test(email)) {
      setError(tR("emailError"));
      return;
    }

    if (password.length < 8) {
      setError(tR("passwordError"));
      return;
    }
    try {
      // const resUserExists = await fetch("api/userExists", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email }),
      // });

      // const { user } = await resUserExists.json();

      // if (user) {
      //   setError("User already exists.");
      //   return;
      // }
      setLoading(true);
      const res = await axios.post("/api/signup", {
        username,
        email,
        password,
      });

      if (res.status === 200) {
        const form = e.target;
        form.reset();
        router.push("/en/checkemail");
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Card className="w-96 lg:w-80 mb-32 p-5 lg:p-3 ">
        <form onSubmit={submitHandler}>
          <CardTitle className="mb-6 lg:mb-4">{tR("signup")}</CardTitle>
          <label>
            {tR("name")}
            <Input
              onChange={nameHandler}
              className="px-3 py-6 lg:py-4 mb-4 lg:mb-2"
              type="text"
              placeholder={tR("namePlaceholder")}
            />
          </label>
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
            <div className="bg-red-500  text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
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

export default SignUp;
