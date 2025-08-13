"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "/public/imgs/Baddel.svg";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { useLocale, useTranslations } from "next-intl";
import { BsList } from "react-icons/bs";

import { useRouter } from "next/navigation";
function HeaderClient() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [queryString, setQueryString] = useState("");
  const locale = useLocale();
  const path = usePathname();
  const router = useRouter();
  const t = useTranslations("Home.nav");
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => data.user?.username && setUser(data.user));
  }, [user, path]);

  const handleChange = (e) => {
    setQueryString(e.target.value);
  };
  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      router.push("/search?q=" + query);
    }
  }, [query]);
  const handleSearch = () => {
    setQuery(queryString);
  };

  const LanguageComponent = () => {
    return locale === "ar" ? (
      <a
        className=" ms-3 p-2 bg-gray-100 rounded-m"
        href={"/en"}
        //  Todo: Use middleware instead for Refreshing
        onClick={() => {
          setTimeout(() => {
            router.refresh();
          }, 200);
        }}
      // locale="en"
      >
        EN
      </a>
    ) : (
      <a
        className=" ms-2  p-2 bg-gray-100 rounded-m"
        href={"/ar"}
        onClick={() => {
          setTimeout(() => {
            router.refresh();
          }, 100);
        }}
      >
        AR
      </a>
    );
  };
  return (
    <>
      <div className="bg-white">
        <div className="flex px-3 md:px-1 sticky container z-50 top-0  items-center">
          <Link href={"/"}>
            <Image
              className="w-20 me-5 md:w-16 py-2"
              width={"120"}
              src={logo}
              alt="Logo"
            />
          </Link>
          <div className="flex ml-2 mr-2 relative items-center ">
            <Input
              type="text"
              className="px-3 py-5 md:py-4 sm:py-2 border-gray-700 border  w-[32em] xl:w-80 lg:w-72 md:w-52 sm:w-32"
              placeholder={`${t("search")}...`}
              onChange={handleChange}
              onKeyUp={(e) => e.key == "Enter" && handleSearch()}
            />
            {/*
          <Select>
            <SelectTrigger className="absolute h-full rounded-l-none border-gray-700 border-2   right-0 w-28">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apps">APPs</SelectItem>
              <SelectItem value="food_products ">Food Products</SelectItem>

              <SelectItem value="technology">Technology</SelectItem>
            </SelectContent>
          </Select>
          */}
          </div>
          <Button
            onClick={(e) => handleSearch()}
            className="px-4 sm:text-sm py-5 md:px-3 md:py-4 sm:px-1 sm:py-2 bg-red-700 border hover:bg-red-600 border-red-600  hover:border-red-600"
          >
            {t("search")}
          </Button>

          <div className=" ms-auto lg:hidden gap-2 flex items-center">
            <Link className="p-2 hover:opacity-80" href={"/categories"}>
              {t("categories")}
            </Link>
            {/* <Link className="p-2 hover:opacity-80" href={"/about"}>
              {t("about")}
            </Link> */}
            {!user && (
              <Link
                className="p-2 hover:text-gray-600"
                href={`/${locale}/signin`}
              >
                {t("signin")}
              </Link>
            )}
            {user && (
              <div className="space-x-3">
                {/* <span className="p-2">{user}</span> */}
                <Link href={"/signout"}>{t("signout")}</Link>
              </div>
            )}
          </div>
          <LanguageComponent />

          <Sheet>
            <SheetTrigger className="ms-auto hidden lg:block">
              <BsList size={"40"} />
            </SheetTrigger>
            <SheetContent className="w-72">
              <div>
                <ul className="ml-auto gap-3 flex flex-col first-of-type:mt-10 items-center">
                  <li className="p-2 hover:text-gray-600">
                    <Link href={"/categories"}>{t("categories")}</Link>
                  </li>
                  <li className="p-2 hover:text-gray-600">
                    <Link href={"/about"}>{t("about")}</Link>
                  </li>

                  {user === null && (
                    <li className="p-2 hover:text-gray-600">
                      <Link href={`${/locale/giinns}`}>{t("signin")} </Link>
                    </li>
                  )}
                  {user !== null && (
                    <li className=" p-2 hover:text-gray-600">
                      {/* <span className="p-2">{user}</span> */}
                      <Link href={"/signout"}>{t("signout")}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default HeaderClient;
